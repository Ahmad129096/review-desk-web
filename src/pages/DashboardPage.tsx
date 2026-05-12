import {
  AlertTriangle,
  Check,
  Copy,
  CreditCard,
  Filter,
  Link2,
  LogOut,
  MessageSquareText,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  Upload,
  Wand2
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Business, GoogleLocation, Review, Task } from "../types";
import {
  useBusinesses,
  useReviews,
  useTasks,
  useCreateBusiness,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
  useImportReviews,
  useGoogleAuthUrl,
  useGoogleLocations,
  useGoogleSelectLocation,
  useGoogleSyncReviews,
  useRegenerateReviewReply,
  useGooglePublishReply,
  useUpdateTask,
  useCheckout,
} from "../api-query";
import { useQueryClient } from "@tanstack/react-query";

type View = "reviews" | "tasks" | "billing";

interface DashboardPageProps {
  user: any;
  onLogout: () => void;
}

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const queryClient = useQueryClient();

  const { data: businesses = [], isLoading: businessesLoading, error: businessesError, refetch: refetchBusinesses } = useBusinesses();
  const { data: reviews = [], isLoading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews();
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError, refetch: refetchTasks } = useTasks();

  const [view, setView] = useState<View>("reviews");

  const isLoading = businessesLoading || reviewsLoading || tasksLoading;
  const error = businessesError || reviewsError || tasksError;

  console.log("in dashboard page", businesses)

  const loadAppData = () => {
    refetchBusinesses();
    refetchReviews();
    refetchTasks();
  };

  const activeBusiness = businesses[0];
  const negativeReviews = reviews.filter((r) => r.sentiment === "NEGATIVE" || r.needsFollowUp).length;
  const openTasks = tasks.filter((t) => t.status !== "DONE").length;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">R</div>
          <div>
            <strong>ReviewDesk AI</strong>
            <span>{activeBusiness?.name ?? "MVP workspace"}</span>
          </div>
        </div>
        <nav>
          <button className={view === "reviews" ? "active" : ""} onClick={() => setView("reviews")}>
            <MessageSquareText size={18} /> Reviews
          </button>
          <button className={view === "tasks" ? "active" : ""} onClick={() => setView("tasks")}>
            <AlertTriangle size={18} /> Tasks
          </button>
          <button className={view === "billing" ? "active" : ""} onClick={() => setView("billing")}>
            <CreditCard size={18} /> Billing
          </button>
        </nav>
        <button
          className="ghostButton"
          onClick={() => {
            localStorage.removeItem("access_token");
            queryClient.clear();
            onLogout();
          }}
        >
          <LogOut size={18} /> Sign out
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Reputation workspace</h1>
            <p>{user.name} · {user.email}</p>
          </div>
          <button className="iconButton" onClick={loadAppData} aria-label="Refresh dashboard">
            <RefreshCw size={18} />
          </button>
        </header>

        {error && (
          <div className="notice error">
            {(error as Error)?.message ?? "Failed to load data. Please refresh."}
          </div>
        )}
        {isLoading && <div className="notice">Loading latest data...</div>}

        <section className="metrics">
          <Metric label="Reviews" value={reviews.length} />
          <Metric label="Need attention" value={negativeReviews} />
          <Metric label="Open tasks" value={openTasks} />
        </section>

        {!activeBusiness ? (
          <BusinessSetup />
        ) : (
          <>
            {view === "reviews" && (
              <ReviewsView business={activeBusiness} reviews={reviews} onRefresh={loadAppData} />
            )}
            {view === "tasks" && <TasksView tasks={tasks} />}
            {view === "billing" && <BillingView />}
          </>
        )}
      </main>
    </div>
  );
}

// ─── BusinessSetup ────────────────────────────────────────────────────────────

function BusinessSetup() {
  const queryClient = useQueryClient();
  const createBusinessMutation = useCreateBusiness();
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Restaurant");
  const [defaultTone, setDefaultTone] = useState<Business["defaultTone"]>("PROFESSIONAL");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await createBusinessMutation.mutateAsync({ name, industry, defaultTone, website: "", phone: "", address: "" });
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create business");
    }
  }

  return (
    <section className="panel narrow">
      <h2>Create business profile</h2>
      <form className="stack" onSubmit={submit}>
        <label>
          Business name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Industry
          <input value={industry} onChange={(e) => setIndustry(e.target.value)} required />
        </label>
        <label>
          Reply tone
          <select value={defaultTone} onChange={(e) => setDefaultTone(e.target.value as Business["defaultTone"])}>
            <option value="PROFESSIONAL">Professional</option>
            <option value="FRIENDLY">Friendly</option>
            <option value="APOLOGETIC">Apologetic</option>
          </select>
        </label>
        {error && <div className="notice error">{error}</div>}
        <button className="primaryButton" type="submit" disabled={createBusinessMutation.isPending}>
          <Plus size={17} /> {createBusinessMutation.isPending ? "Creating..." : "Create profile"}
        </button>
      </form>
    </section>
  );
}

// ─── ReviewsView ──────────────────────────────────────────────────────────────

function ReviewsView({
  business,
  reviews,
  onRefresh,
}: {
  business: Business;
  reviews: Review[];
  onRefresh: () => void;
}) {
  const createReviewMutation = useCreateReview();
  const importReviewsMutation = useImportReviews();

  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [csv, setCsv] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("ALL");
  const [ratingFilter, setRatingFilter] = useState("ALL");
  const [error, setError] = useState("");

  const filteredReviews = useMemo(
    () =>
      reviews.filter((review) => {
        const sentimentMatches = sentimentFilter === "ALL" || review.sentiment === sentimentFilter;
        const ratingMatches = ratingFilter === "ALL" || review.rating === Number(ratingFilter);
        return sentimentMatches && ratingMatches;
      }),
    [ratingFilter, reviews, sentimentFilter]
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await createReviewMutation.mutateAsync({ businessId: business.id, reviewerName, rating, content });
      setReviewerName("");
      setRating(5);
      setContent("");
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create review");
    }
  }

  async function importCsv(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await importReviewsMutation.mutateAsync({ businessId: business.id, csv });
      setCsv("");
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not import reviews");
    }
  }

  return (
    <div className="contentGrid">
      <div className="sideStack">
        <section className="panel">
          <h2>Add review</h2>
          <form className="stack" onSubmit={submit}>
            <label>
              Reviewer
              <input value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} placeholder="Optional" />
            </label>
            <label>
              Rating
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map((v) => (
                  <option key={v} value={v}>{v} stars</option>
                ))}
              </select>
            </label>
            <label>
              Review text
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={7} />
            </label>
            {error && <div className="notice error">{error}</div>}
            <button className="primaryButton" type="submit" disabled={createReviewMutation.isPending}>
              <MessageSquareText size={17} />
              {createReviewMutation.isPending ? "Generating..." : "Generate reply"}
            </button>
          </form>
        </section>

        <GoogleIntegration business={business} onRefresh={onRefresh} />

        <section className="panel">
          <h2>Import CSV</h2>
          <form className="stack" onSubmit={importCsv}>
            <label>
              CSV file
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={async (e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) setCsv(await file.text());
                }}
              />
            </label>
            <label>
              CSV preview
              <textarea
                value={csv}
                onChange={(e) => setCsv(e.target.value)}
                placeholder="reviewer_name,rating,content,review_date"
                rows={5}
              />
            </label>
            <button className="primaryButton" type="submit" disabled={importReviewsMutation.isPending || !csv.trim()}>
              <Upload size={17} />
              {importReviewsMutation.isPending ? "Importing..." : "Import reviews"}
            </button>
          </form>
        </section>
      </div>

      <section className="list">
        <div className="panel filters">
          <div>
            <strong><Filter size={16} /> Filters</strong>
            <span>{filteredReviews.length} of {reviews.length} reviews</span>
          </div>
          <label>
            Sentiment
            <select value={sentimentFilter} onChange={(e) => setSentimentFilter(e.target.value)}>
              <option value="ALL">All sentiment</option>
              <option value="POSITIVE">Positive</option>
              <option value="NEUTRAL">Neutral</option>
              <option value="NEGATIVE">Negative</option>
            </select>
          </label>
          <label>
            Rating
            <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="ALL">All ratings</option>
              {[5, 4, 3, 2, 1].map((v) => (
                <option key={v} value={v}>{v} stars</option>
              ))}
            </select>
          </label>
        </div>
        {filteredReviews.map((review) => (
          <ReviewItem key={review.id} review={review} onRefresh={onRefresh} />
        ))}
        {!filteredReviews.length && (
          <EmptyState
            text={
              reviews.length
                ? "No reviews match the current filters."
                : "Add the first customer review to generate an AI reply."
            }
          />
        )}
      </section>
    </div>
  );
}

// ─── ReviewItem ───────────────────────────────────────────────────────────────

function ReviewItem({ review, onRefresh }: { review: any; onRefresh: () => void }) {
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();
  const regenerateMutation = useRegenerateReviewReply();
  const publishMutation = useGooglePublishReply();

  const busy =
    updateReviewMutation.isPending ||
    deleteReviewMutation.isPending ||
    regenerateMutation.isPending ||
    publishMutation.isPending;

  async function markReplied() {
    await updateReviewMutation.mutateAsync({ id: review.id, status: "REPLIED" });
  }

  async function regenerate() {
    await regenerateMutation.mutateAsync(review.id);
  }

  async function handleDelete() {
    await deleteReviewMutation.mutateAsync(review.id);
  }

  async function publishToGoogle() {
    await publishMutation.mutateAsync(review.id);
  }

  return (
    <article className="panel reviewItem">
      <div className="itemHeader">
        <div>
          <strong>{review.reviewerName || "Anonymous customer"}</strong>
          <span>{review.rating} stars · {review.sentiment ?? "PENDING"} · {review.urgency ?? "PENDING"}</span>
        </div>
        <StatusPill status={review.status} />
      </div>
      <p>{review.content}</p>
      {review.summary && <p className="muted">{review.summary}</p>}
      {review.aiReply ? (
        <div className="replyBox">
          <p>{review.aiReply}</p>
          <div className="actions">
            <button onClick={() => navigator.clipboard.writeText(review.aiReply ?? "")}>
              <Copy size={16} /> Copy
            </button>
            <button onClick={markReplied} disabled={busy}>
              <Check size={16} /> Mark replied
            </button>
            <button onClick={regenerate} disabled={busy}>
              <Wand2 size={16} /> Regenerate
            </button>
            <button onClick={handleDelete} disabled={busy}>
              <Trash2 size={16} /> Delete
            </button>
            {(review.source === "GOOGLE" || review.externalReviewName) && !review.replyPublishedAt && (
              <button onClick={publishToGoogle} disabled={busy}>
                <Send size={16} /> Publish to Google
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="actions">
          <button onClick={regenerate} disabled={busy}>
            <Wand2 size={16} /> Generate reply
          </button>
          <button onClick={handleDelete} disabled={busy}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </article>
  );
}

// ─── GoogleIntegration ────────────────────────────────────────────────────────

function GoogleIntegration({ business, onRefresh }: { business: Business; onRefresh: () => void }) {
  const googleAuthUrlMutation = useGoogleAuthUrl();
  const googleLocationsMutation = useGoogleLocations();
  const googleSelectLocationMutation = useGoogleSelectLocation();
  const googleSyncReviewsMutation = useGoogleSyncReviews();

  const [locations, setLocations] = useState<GoogleLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [autoReply, setAutoReply] = useState(false);
  const [autoReplyMinRating, setAutoReplyMinRating] = useState(5);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loading =
    googleAuthUrlMutation.isPending ||
    googleLocationsMutation.isPending ||
    googleSelectLocationMutation.isPending ||
    googleSyncReviewsMutation.isPending;

  async function connectGoogle() {
    setError("");
    try {
      const response = await googleAuthUrlMutation.mutateAsync({ businessId: business.id });
      window.location.href = response.data.data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not get Google auth URL");
    }
  }

  async function loadLocations() {
    setError("");
    setMessage("");
    try {
      const response = await googleLocationsMutation.mutateAsync({ businessId: business.id });
      const locs = response.data.data.locations;
      setLocations(locs);
      setMessage(locs.length ? "Select the matching Google Business location." : "No Google locations were returned.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load Google locations");
    }
  }

  async function saveLocation() {
    const location = locations.find((item) => item.locationName === selectedLocation);
    if (!location) return;
    setError("");
    try {
      await googleSelectLocationMutation.mutateAsync({
        businessId: business.id,
        accountName: location.accountName,
        locationName: location.locationName,
      });
      setMessage("Google location connected.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save Google location");
    }
  }

  async function syncReviews() {
    setError("");
    try {
      const response = await googleSyncReviewsMutation.mutateAsync({
        businessId: business.id,
        autoReply,
        autoReplyMinRating,
      });
      const { importedCount, publishedReplies } = response.data.data;
      setMessage(`Synced ${importedCount} Google reviews. Published ${publishedReplies} replies.`);
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sync Google reviews");
    }
  }

  return (
    <section className="panel">
      <h2>Google Business</h2>
      <div className="stack">
        <button className="primaryButton" type="button" onClick={connectGoogle} disabled={loading}>
          <Link2 size={17} /> Connect Google
        </button>
        <button type="button" onClick={loadLocations} disabled={loading}>
          Load locations
        </button>
        {!!locations.length && (
          <>
            <label>
              Location
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="">Choose location</option>
                {locations.map((loc) => (
                  <option key={loc.locationName} value={loc.locationName}>{loc.title}</option>
                ))}
              </select>
            </label>
            <button type="button" onClick={saveLocation} disabled={!selectedLocation || loading}>
              Save location
            </button>
          </>
        )}
        <label className="checkboxLabel">
          <input type="checkbox" checked={autoReply} onChange={(e) => setAutoReply(e.target.checked)} />
          Auto-publish positive replies
        </label>
        <label>
          Minimum rating for auto-reply
          <select value={autoReplyMinRating} onChange={(e) => setAutoReplyMinRating(Number(e.target.value))}>
            <option value={5}>5 stars only</option>
            <option value={4}>4 stars and up</option>
          </select>
        </label>
        <button type="button" onClick={syncReviews} disabled={loading}>
          <RefreshCw size={17} /> {loading ? "Working..." : "Sync Google reviews"}
        </button>
        {message && <div className="notice">{message}</div>}
        {error && <div className="notice error">{error}</div>}
      </div>
    </section>
  );
}

// ─── TasksView ────────────────────────────────────────────────────────────────

function TasksView({ tasks }: { tasks: Task[] }) {
  const updateTaskMutation = useUpdateTask();

  async function updateStatus(id: string, status: string) {
    await updateTaskMutation.mutateAsync({ id, status } as any);
  }

  return (
    <section className="list">
      {tasks.map((task: any) => (
        <article className="panel taskItem" key={task.id}>
          <div className="itemHeader">
            <div>
              <strong>{task.title}</strong>
              <span>{task.business?.name} · {task.priority}</span>
            </div>
            <StatusPill status={task.status} />
          </div>
          {task.description && <p>{task.description}</p>}
          {task.review && <p className="muted">{task.review.rating} stars · {task.review.content}</p>}
          <div className="actions">
            <button
              onClick={() => updateStatus(task.id, "IN_PROGRESS")}
              disabled={updateTaskMutation.isPending}
            >
              In progress
            </button>
            <button
              onClick={() => updateStatus(task.id, "DONE")}
              disabled={updateTaskMutation.isPending}
            >
              <Check size={16} /> Done
            </button>
          </div>
        </article>
      ))}
      {!tasks.length && <EmptyState text="Negative or urgent reviews will create follow-up tasks here." />}
    </section>
  );
}

// ─── BillingView ──────────────────────────────────────────────────────────────

function BillingView() {
  const checkoutMutation = useCheckout();
  const [error, setError] = useState("");

  async function checkout(plan: "STARTER" | "PRO") {
    setError("");
    try {
      const response = await checkoutMutation.mutateAsync(plan);
      window.location.href = response.data.data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Billing is not available");
    }
  }

  return (
    <section className="pricing">
      {error && <div className="notice error">{error}</div>}
      <Plan name="Free" price="$0" limit="20 replies/month" />
      <Plan name="Starter" price="$9" limit="200 replies/month" action={() => checkout("STARTER")} />
      <Plan name="Pro" price="$29" limit="1,000 replies/month" action={() => checkout("PRO")} />
    </section>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return <span className={`pill ${status.toLowerCase()}`}>{status.replace("_", " ")}</span>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="empty">{text}</div>;
}

function Plan({ name, price, limit, action }: { name: string; price: string; limit: string; action?: () => void }) {
  const features = ["AI review replies", "Sentiment detection", "Follow-up task tracking"];
  return (
    <article className="panel plan">
      <h2>{name}</h2>
      <strong>{price}<span>/month</span></strong>
      <p>{limit}</p>
      <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
      <button className="primaryButton" disabled={!action} onClick={action}>
        {action ? "Upgrade" : "Included"}
      </button>
    </article>
  );
}