import {
  Activity,
  AlertTriangle,
  CreditCard,
  Filter,
  Home,
  Link2,
  LogOut,
  MessageSquareText,
  Plus,
  RefreshCw,
  Send,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  Wand2,
  Copy,
  Check
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Business, GoogleLocation, Review } from "../types";
import {
  useBusinesses,
  useReviews,
  useCreateBusiness,
  useCreateReview,
  useImportReviews,
  useUpdateReview,
  useDeleteReview,
  useRegenerateReviewReply,
  useGooglePublishReply,
  useGoogleAuthUrl,
  useGoogleLocations,
  useGoogleSelectLocation,
  useGoogleSyncReviews,
} from "../api-query";
import { useQueryClient } from "@tanstack/react-query";

interface ReviewsPageProps {
  user: any;
  onLogout: () => void;
}

export function ReviewsPage({ user, onLogout }: ReviewsPageProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: businesses = [], isLoading: businessesLoading, refetch: refetchBusinesses } = useBusinesses();
  const { data: reviews = [], isLoading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews();

  const isLoading = businessesLoading || reviewsLoading;
  const activeBusiness = businesses[0];
  const negativeReviews = reviews.filter((r) => r.sentiment === "NEGATIVE" || r.needsFollowUp).length;

  const loadReviewsData = () => {
    refetchBusinesses();
    refetchReviews();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("access_token");
    queryClient.clear();
    onLogout();
    navigate("/login");
  };


  if (!isLoading && !activeBusiness) {
    return (
      <div className="shell">
        <main className="main">
          <BusinessSetup />
        </main>
      </div>
    );
  }

  return (
    <div className="shell">
      <main className="main">
        <header
          className="topbar"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "24px 32px",
            borderRadius: "16px",
            marginBottom: "32px",
            border: "none",
            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.2)",
          }}
        >
          <div>
            <h1 style={{ color: "white", marginBottom: "4px" }}>Reviews Management 📝</h1>
            <p style={{ color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
              {user.name} · {user.email} · {isLoading ? "Loading..." : `${reviews.length} total reviews`}
            </p>
          </div>
          <button
            className="iconButton"
            onClick={loadReviewsData}
            aria-label="Refresh reviews"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
            }}
          >
            <RefreshCw size={18} />
          </button>
        </header>

        {reviewsError && (
          <div
            className="notice error"
            style={{
              marginBottom: "24px",
              padding: "16px 20px",
              borderRadius: "12px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
            }}
          >
            {(reviewsError as Error)?.message ?? "Failed to load reviews."}
          </div>
        )}

        {/* Metrics */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Total Reviews */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "24px",
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Total Reviews</div>
                <div style={{ fontSize: "32px", fontWeight: "800", lineHeight: "1" }}>{reviews.length}</div>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MessageSquareText size={24} />
              </div>
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              <TrendingUp size={16} style={{ marginRight: "4px", verticalAlign: "text-bottom" }} />
              All customer feedback
            </div>
          </div>

          {/* Need Attention */}
          <div
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              padding: "24px",
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 30px rgba(245, 87, 108, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Need Attention</div>
                <div style={{ fontSize: "32px", fontWeight: "800", lineHeight: "1" }}>{negativeReviews}</div>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertTriangle size={24} />
              </div>
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              <Activity size={16} style={{ marginRight: "4px", verticalAlign: "text-bottom" }} />
              {negativeReviews > 0 ? "Requires action" : "All good!"}
            </div>
          </div>

          {/* Positive Rate */}
          <div
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              padding: "24px",
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 30px rgba(79, 172, 254, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Positive Rate</div>
                <div style={{ fontSize: "32px", fontWeight: "800", lineHeight: "1" }}>
                  {reviews.length > 0
                    ? Math.round((reviews.filter((r) => r.sentiment === "POSITIVE").length / reviews.length) * 100)
                    : 0}%
                </div>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrendingUp size={24} />
              </div>
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              <Star size={16} style={{ marginRight: "4px", verticalAlign: "text-bottom" }} />
              Customer satisfaction
            </div>
          </div>
        </section>

        {isLoading && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px", background: "white", borderRadius: "16px", border: "1px solid #e8eaed", marginBottom: "24px" }}>
            <span style={{ color: "#667085" }}>Loading reviews...</span>
          </div>
        )}

        {activeBusiness && (
          <ReviewsContent business={activeBusiness} reviews={reviews} onRefresh={loadReviewsData} />
        )}
      </main>
    </div>
  );
}

// ─── BusinessSetup ────────────────────────────────────────────────────────────

function BusinessSetup() {
  const queryClient = useQueryClient();
  const createBusiness = useCreateBusiness();
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Restaurant");
  const [defaultTone, setDefaultTone] = useState<Business["defaultTone"]>("PROFESSIONAL");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await createBusiness.mutateAsync({ name, industry, defaultTone, website: "", phone: "", address: "" });
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
        <button className="primaryButton" type="submit" disabled={createBusiness.isPending}>
          <Plus size={17} /> {createBusiness.isPending ? "Creating..." : "Create profile"}
        </button>
      </form>
    </section>
  );
}

// ─── ReviewsContent ───────────────────────────────────────────────────────────

function ReviewsContent({
  business,
  reviews,
  onRefresh,
}: {
  business: Business;
  reviews: Review[];
  onRefresh: () => void;
}) {
  const createReview = useCreateReview();
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
      await createReview.mutateAsync({ businessId: business.id, reviewerName, rating, content });
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
    <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "32px" }}>
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Add Review form */}
        <section style={{ background: "white", padding: "32px", borderRadius: "16px", border: "1px solid #e8eaed", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageSquareText size={20} style={{ color: "#667eea" }} />
            Add Review
          </h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={submit}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#344054" }}>Reviewer Name</label>
              <input
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Optional"
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #d8e1ec", borderRadius: "8px", fontSize: "16px", background: "#fff" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#344054" }}>Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #d8e1ec", borderRadius: "8px", fontSize: "16px", background: "#fff" }}
              >
                {[5, 4, 3, 2, 1].map((v) => <option key={v} value={v}>{v} stars</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#344054" }}>Review Text</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={7}
                placeholder="Enter the customer's review..."
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #d8e1ec", borderRadius: "8px", fontSize: "16px", background: "#fff", resize: "vertical" }}
              />
            </div>
            {error && (
              <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "14px" }}>
                {error}
              </div>
            )}
            <button
              className="primaryButton"
              type="submit"
              disabled={createReview.isPending}
              style={{ padding: "14px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none", fontSize: "16px", fontWeight: "600", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 15px rgba(102,126,234,0.3)", cursor: createReview.isPending ? "not-allowed" : "pointer" }}
            >
              <MessageSquareText size={20} />
              {createReview.isPending ? "Generating AI Reply..." : "Generate AI Reply"}
            </button>
          </form>
        </section>

        <GoogleIntegration business={business} onRefresh={onRefresh} />

        {/* Import CSV */}
        <section style={{ background: "white", padding: "32px", borderRadius: "16px", border: "1px solid #e8eaed", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            <Upload size={20} style={{ color: "#667eea" }} />
            Import CSV
          </h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={importCsv}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#344054" }}>CSV File</label>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={async (e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) setCsv(await file.text());
                }}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #d8e1ec", borderRadius: "8px", fontSize: "16px", background: "#fff" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#344054" }}>CSV Preview</label>
              <textarea
                value={csv}
                onChange={(e) => setCsv(e.target.value)}
                placeholder="reviewer_name,rating,content,review_date"
                rows={5}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #d8e1ec", borderRadius: "8px", fontSize: "14px", background: "#fff", resize: "vertical", fontFamily: "monospace" }}
              />
            </div>
            <button
              className="primaryButton"
              type="submit"
              disabled={importReviewsMutation.isPending || !csv.trim()}
              style={{ padding: "14px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", border: "none", fontSize: "16px", fontWeight: "600", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 15px rgba(79,172,254,0.3)", cursor: (importReviewsMutation.isPending || !csv.trim()) ? "not-allowed" : "pointer" }}
            >
              <Upload size={20} />
              {importReviewsMutation.isPending ? "Importing..." : "Import Reviews"}
            </button>
          </form>
        </section>
      </div>

      {/* Right column */}
      <section style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Filters */}
        <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e8eaed", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Filter size={20} style={{ color: "#667eea" }} />
              <strong style={{ fontSize: "18px", fontWeight: "700" }}>Filters</strong>
              <span style={{ padding: "4px 12px", background: "#f8fafc", borderRadius: "20px", fontSize: "14px", color: "#667085", fontWeight: "500" }}>
                {filteredReviews.length} of {reviews.length} reviews
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#344054" }}>Sentiment</label>
              <select value={sentimentFilter} onChange={(e) => setSentimentFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #d8e1ec", borderRadius: "8px", fontSize: "14px", background: "#fff" }}>
                <option value="ALL">All sentiment</option>
                <option value="POSITIVE">Positive</option>
                <option value="NEUTRAL">Neutral</option>
                <option value="NEGATIVE">Negative</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#344054" }}>Rating</label>
              <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #d8e1ec", borderRadius: "8px", fontSize: "14px", background: "#fff" }}>
                <option value="ALL">All ratings</option>
                {[5, 4, 3, 2, 1].map((v) => <option key={v} value={v}>{v} stars</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Review list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredReviews.map((review) => (
            <ReviewItem key={review.id} review={review} onRefresh={onRefresh} />
          ))}
          {!filteredReviews.length && (
            <div style={{ padding: "48px", background: "white", borderRadius: "16px", border: "1px solid #e8eaed", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <MessageSquareText size={48} style={{ color: "#667eea", marginBottom: "16px" }} />
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: "600" }}>
                {reviews.length ? "No reviews match your filters" : "No reviews yet"}
              </h3>
              <p style={{ margin: 0, color: "#667085", fontSize: "16px" }}>
                {reviews.length ? "Try adjusting your filter settings" : "Add your first customer review to get started"}
              </p>
            </div>
          )}
        </div>
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
    onRefresh();
  }

  async function regenerate() {
    await regenerateMutation.mutateAsync(review.id);
    onRefresh();
  }

  async function handleDelete() {
    await deleteReviewMutation.mutateAsync(review.id);
    onRefresh();
  }

  async function publishToGoogle() {
    await publishMutation.mutateAsync(review.id);
    onRefresh();
  }

  return (
    <article className="panel reviewItem">
      <div className="itemHeader">
        <div>
          <strong>{review.reviewerName || "Anonymous customer"}</strong>
          <span>{review.rating} stars · {review.sentiment ?? "PENDING"} · {review.urgency ?? "PENDING"}</span>
        </div>
        <span className={`pill ${review.status.toLowerCase()}`}>{review.status.replace("_", " ")}</span>
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

  console.log({ loading })

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