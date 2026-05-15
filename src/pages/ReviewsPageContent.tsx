import {
  Activity,
  AlertTriangle,
  Copy,
  CreditCard,
  Filter,
  Link2,
  MessageSquareText,
  Plus,
  RefreshCw,
  Send,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  Wand2,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Business, GoogleLocation, Review } from "../types";
import {
  EmptyState,
  Metric,
  ReviewItem,
  StatusPill,
} from "../components/SharedComponents";
import {
  useBusinesses,
  useReviews,
  useUpdateReview,
  useDeleteReview,
  useImportReviews,
  api,
} from "../api-query";

interface ReviewsPageContentProps {
  user: any;
}

export function ReviewsPageContent({ user }: ReviewsPageContentProps) {
  const {
    data: businesses = [],
    isLoading: businessesLoading,
    error: businessesError,
    refetch: refetchBusinesses,
  } = useBusinesses();
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useReviews();
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();
  const importReviewsMutation = useImportReviews();

  const isLoading = businessesLoading || reviewsLoading;
  console.log({ isLoading });
  const error = businessesError || reviewsError;
  const [initialLoad, setInitialLoad] = useState(true);

  const loadReviewsData = () => {
    refetchBusinesses();
    refetchReviews();
    setInitialLoad(false);
  };

  const activeBusiness = businesses[0];
  const negativeReviews = reviews.filter(
    (review) => review.sentiment === "NEGATIVE" || review.needsFollowUp,
  ).length;

  if (!activeBusiness) {
    return <BusinessSetup onCreated={() => refetchBusinesses()} />;
  }

  if (isLoading) {
    return (
      <>
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
            <h1 style={{ color: "white", marginBottom: "4px" }}>
              Reviews Management 📝
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
              {user.name} · {user.email} · Loading reviews...
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

        {/* Skeleton Metrics */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "24px",
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.2)",
                position: "relative",
                overflow: "hidden",
                opacity: 0.7,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginBottom: "4px",
                    }}
                  >
                    Loading...
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      lineHeight: "1",
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "4px",
                      width: "60px",
                      height: "32px",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>
                <div
                  style={{
                    width: "80px",
                    height: "16px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </section>

        {/* Skeleton Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "380px 1fr",
            gap: "32px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "16px",
                border: "1px solid #e8eaed",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  height: "20px",
                  background: "#f3f4f6",
                  borderRadius: "4px",
                  marginBottom: "24px",
                  width: "120px",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div
                      style={{
                        height: "14px",
                        background: "#f3f4f6",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        width: "80px",
                      }}
                    ></div>
                    <div
                      style={{
                        height: "44px",
                        background: "#f3f4f6",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid #e8eaed",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  height: "20px",
                  background: "#f3f4f6",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  width: "100px",
                }}
              ></div>
              <div style={{ display: "flex", gap: "16px" }}>
                {[1, 2].map((i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div
                      style={{
                        height: "14px",
                        background: "#f3f4f6",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        width: "60px",
                      }}
                    ></div>
                    <div
                      style={{
                        height: "36px",
                        background: "#f3f4f6",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid #e8eaed",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        height: "16px",
                        background: "#f3f4f6",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        width: "120px",
                      }}
                    ></div>
                    <div
                      style={{
                        height: "14px",
                        background: "#f3f4f6",
                        borderRadius: "4px",
                        width: "80px",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      width: "60px",
                      height: "24px",
                      background: "#f3f4f6",
                      borderRadius: "12px",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    height: "60px",
                    background: "#f3f4f6",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "80px",
                        height: "32px",
                        background: "#f3f4f6",
                        borderRadius: "6px",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
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
          <h1 style={{ color: "white", marginBottom: "4px" }}>
            Reviews Management 📝
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
            {user.name} · {user.email} · {reviews.length} total reviews
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

      {/* Modern Metrics Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div>
              <div
                style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}
              >
                Total Reviews
              </div>
              <div
                style={{ fontSize: "32px", fontWeight: "800", lineHeight: "1" }}
              >
                {reviews.length}
              </div>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageSquareText size={24} />
            </div>
          </div>
          <div style={{ fontSize: "14px", opacity: 0.8 }}>
            <TrendingUp
              size={16}
              style={{ marginRight: "4px", verticalAlign: "text-bottom" }}
            />
            All customer feedback
          </div>
        </div>

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div>
              <div
                style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}
              >
                Need Attention
              </div>
              <div
                style={{ fontSize: "32px", fontWeight: "800", lineHeight: "1" }}
              >
                {negativeReviews}
              </div>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={24} />
            </div>
          </div>
          <div style={{ fontSize: "14px", opacity: 0.8 }}>
            <Activity
              size={16}
              style={{ marginRight: "4px", verticalAlign: "text-bottom" }}
            />
            {negativeReviews > 0 ? "Requires action" : "All good!"}
          </div>
        </div>

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div>
              <div
                style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}
              >
                Positive Rate
              </div>
              <div
                style={{ fontSize: "32px", fontWeight: "800", lineHeight: "1" }}
              >
                {reviews.length > 0
                  ? Math.round(
                      (reviews.filter((r) => r.sentiment === "POSITIVE")
                        .length /
                        reviews.length) *
                        100,
                    )
                  : 0}
                %
              </div>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={24} />
            </div>
          </div>
          <div style={{ fontSize: "14px", opacity: 0.8 }}>
            <Star
              size={16}
              style={{ marginRight: "4px", verticalAlign: "text-bottom" }}
            />
            Customer satisfaction
          </div>
        </div>
      </section>

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            background: "white",
            borderRadius: "16px",
            border: "1px solid #e8eaed",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="spinner"
              style={{ width: "20px", height: "20px" }}
            ></div>
            <span style={{ color: "#667085" }}>Updating reviews...</span>
          </div>
        </div>
      )}

      <ReviewsContent
        business={activeBusiness}
        reviews={reviews}
        onCreated={(review) => {
          refetchReviews();
        }}
        onImported={(nextReviews) => {
          refetchReviews();
        }}
        onStatusChange={(review) => refetchReviews()}
        onDeleted={(id) => refetchReviews()}
        onSynced={(nextReviews) => {
          refetchReviews();
        }}
      />
    </>
  );
}

// Helper components (keeping the same as before)
function BusinessSetup({
  onCreated,
}: {
  onCreated: (business: Business) => void;
}) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Restaurant");
  const [defaultTone, setDefaultTone] =
    useState<Business["defaultTone"]>("PROFESSIONAL");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const response = await api.createBusiness({
        name,
        industry,
        defaultTone,
        website: "",
        phone: "",
        address: "",
      });
      onCreated(response.data.business!);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create business",
      );
    }
  }

  return (
    <section className="panel narrow">
      <h2>Create business profile</h2>
      <form className="stack" onSubmit={submit}>
        <label>
          Business name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Industry
          <input
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
            required
          />
        </label>
        <label>
          Reply tone
          <select
            value={defaultTone}
            onChange={(event) =>
              setDefaultTone(event.target.value as Business["defaultTone"])
            }
          >
            <option value="PROFESSIONAL">Professional</option>
            <option value="FRIENDLY">Friendly</option>
            <option value="APOLOGETIC">Apologetic</option>
          </select>
        </label>
        {error && <div className="notice error">{error}</div>}
        <button className="primaryButton" type="submit">
          <Plus size={17} /> Create profile
        </button>
      </form>
    </section>
  );
}

function ReviewsContent({
  business,
  reviews,
  onCreated,
  onImported,
  onStatusChange,
  onDeleted,
  onSynced,
}: {
  business: Business;
  reviews: Review[];
  onCreated: (review: Review) => void;
  onImported: (reviews: Review[]) => void;
  onStatusChange: (review: Review) => void;
  onDeleted: (id: string) => void;
  onSynced: (reviews: Review[]) => void;
}) {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [csv, setCsv] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("ALL");
  const [ratingFilter, setRatingFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");

  const filteredReviews = useMemo(
    () =>
      reviews.filter((review) => {
        const sentimentMatches =
          sentimentFilter === "ALL" || review.sentiment === sentimentFilter;
        const ratingMatches =
          ratingFilter === "ALL" || review.rating === Number(ratingFilter);
        return sentimentMatches && ratingMatches;
      }),
    [ratingFilter, reviews, sentimentFilter],
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.createReview({
        businessId: business.id,
        reviewerName,
        rating,
        content,
      });
      onCreated((response.data as any).data.review);
      setReviewerName("");
      setRating(5);
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create review");
    } finally {
      setLoading(false);
    }
  }

  async function importCsv(event: FormEvent) {
    event.preventDefault();
    setImporting(true);
    setError("");
    try {
      const response = await api.importReviews({
        businessId: business.id,
        csv,
      });
      onImported((response.data as any).data.reviews);
      setCsv("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not import reviews");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "32px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <section
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid #e8eaed",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "24px",
              fontSize: "20px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MessageSquareText size={20} style={{ color: "#667eea" }} />
            Add Review
          </h2>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={submit}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                Reviewer Name
              </label>
              <input
                value={reviewerName}
                onChange={(event) => setReviewerName(event.target.value)}
                placeholder="Optional"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "16px",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                Rating
              </label>
              <select
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "16px",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} stars
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                Review Text
              </label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
                rows={7}
                placeholder="Enter the customer's review..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "16px",
                  background: "#fff",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                }}
              />
            </div>
            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  color: "#dc2626",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}
            <button
              className="primaryButton"
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 24px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              <MessageSquareText size={20} />
              {loading ? "Generating AI Reply..." : "Generate AI Reply"}
            </button>
          </form>
        </section>

        <GoogleIntegration business={business} onSynced={onSynced} />

        <section
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid #e8eaed",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "24px",
              fontSize: "20px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Upload size={20} style={{ color: "#667eea" }} />
            Import CSV
          </h2>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={importCsv}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                CSV File
              </label>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={async (event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) setCsv(await file.text());
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "16px",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                CSV Preview
              </label>
              <textarea
                value={csv}
                onChange={(event) => setCsv(event.target.value)}
                placeholder="reviewer_name,rating,content,review_date"
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: "#fff",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                  fontFamily: "monospace",
                }}
              />
            </div>
            <button
              className="primaryButton"
              type="submit"
              disabled={importing || !csv.trim()}
              style={{
                padding: "14px 24px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(79, 172, 254, 0.3)",
                cursor: importing || !csv.trim() ? "not-allowed" : "pointer",
              }}
            >
              <Upload size={20} />
              {importing ? "Importing..." : "Import Reviews"}
            </button>
          </form>
        </section>
      </div>

      <section
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e8eaed",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Filter size={20} style={{ color: "#667eea" }} />
              <strong style={{ fontSize: "18px", fontWeight: "700" }}>
                Filters
              </strong>
              <span
                style={{
                  padding: "4px 12px",
                  background: "#f8fafc",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#667085",
                  fontWeight: "500",
                }}
              >
                {filteredReviews.length} of {reviews.length} reviews
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                Sentiment
              </label>
              <select
                value={sentimentFilter}
                onChange={(event) => setSentimentFilter(event.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
              >
                <option value="ALL">All sentiment</option>
                <option value="POSITIVE">Positive</option>
                <option value="NEUTRAL">Neutral</option>
                <option value="NEGATIVE">Negative</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                Rating
              </label>
              <select
                value={ratingFilter}
                onChange={(event) => setRatingFilter(event.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
              >
                <option value="ALL">All ratings</option>
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} stars
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onStatusChange={onStatusChange}
              onDeleted={onDeleted}
            />
          ))}
          {!filteredReviews.length && (
            <div
              style={{
                padding: "48px",
                background: "white",
                borderRadius: "16px",
                border: "1px solid #e8eaed",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <MessageSquareText
                size={48}
                style={{ color: "#667eea", marginBottom: "16px" }}
              />
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {reviews.length
                  ? "No reviews match your filters"
                  : "No reviews yet"}
              </h3>
              <p style={{ margin: 0, color: "#667085", fontSize: "16px" }}>
                {reviews.length
                  ? "Try adjusting your filter settings"
                  : "Add your first customer review to get started"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function GoogleIntegration({
  business,
  onSynced,
}: {
  business: Business;
  onSynced: (reviews: Review[]) => void;
}) {
  const [locations, setLocations] = useState<GoogleLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [autoReply, setAutoReply] = useState(false);
  const [autoReplyMinRating, setAutoReplyMinRating] = useState(5);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function connectGoogle() {
    setError("");
    const response = await api.googleAuthUrl(business.id);
    console.log({ response });
    window.location.href = response.data.url!;
  }

  async function loadLocations() {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await api.googleLocations(business.id);
      setLocations((response.data as any).data.locations);
      setMessage(
        (response.data as any).data.locations.length
          ? "Select the matching Google Business location."
          : "No Google locations were returned.",
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load Google locations",
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveLocation() {
    const location = locations.find(
      (item) => item.locationName === selectedLocation,
    );
    if (!location) return;

    setLoading(true);
    setError("");
    try {
      await api.googleSelectLocation({
        businessId: business.id,
        accountName: location.accountName,
        locationName: location.locationName,
      });
      setMessage("Google location connected.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save Google location",
      );
    } finally {
      setLoading(false);
    }
  }

  async function syncReviews() {
    setLoading(true);
    setError("");
    try {
      const response = await api.googleSyncReviews({
        businessId: business.id,
        autoReply,
        autoReplyMinRating,
      });
      onSynced((response.data as any).data.reviews);
      setMessage(
        `Synced ${(response.data as any).data.importedCount} Google reviews. Published ${(response.data as any).data.publishedReplies} replies.`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not sync Google reviews",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{
        background: "white",
        padding: "32px",
        borderRadius: "16px",
        border: "1px solid #e8eaed",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2
        style={{
          marginBottom: "24px",
          fontSize: "20px",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Link2 size={20} style={{ color: "#667eea" }} />
        Google Business
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button
          className="primaryButton"
          type="button"
          onClick={connectGoogle}
          style={{
            padding: "14px 24px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
          }}
        >
          <Link2 size={20} />
          Connect Google
        </button>
        <button
          type="button"
          onClick={loadLocations}
          disabled={loading}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "1px solid #d8e1ec",
            background: "#fff",
            fontSize: "14px",
            fontWeight: "500",
            color: "#344054",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Load locations
        </button>
        {!!locations.length && (
          <>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d8e1ec",
                  borderRadius: "8px",
                  fontSize: "16px",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
              >
                <option value="">Choose location</option>
                {locations.map((location) => (
                  <option
                    key={location.locationName}
                    value={location.locationName}
                  >
                    {location.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={saveLocation}
              disabled={!selectedLocation || loading}
              style={{
                padding: "12px 20px",
                borderRadius: "8px",
                border: "1px solid #d8e1ec",
                background: "#fff",
                fontSize: "14px",
                fontWeight: "500",
                color: "#344054",
                cursor:
                  !selectedLocation || loading ? "not-allowed" : "pointer",
              }}
            >
              Save location
            </button>
          </>
        )}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#344054",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={autoReply}
            onChange={(event) => setAutoReply(event.target.checked)}
          />
          Auto-publish positive replies
        </label>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#344054",
            }}
          >
            Minimum rating for auto-reply
          </label>
          <select
            value={autoReplyMinRating}
            onChange={(event) =>
              setAutoReplyMinRating(Number(event.target.value))
            }
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #d8e1ec",
              borderRadius: "8px",
              fontSize: "16px",
              background: "#fff",
              transition: "all 0.2s ease",
            }}
          >
            <option value={5}>5 stars only</option>
            <option value={4}>4 stars and up</option>
          </select>
        </div>
        <button
          type="button"
          onClick={syncReviews}
          disabled={loading}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "1px solid #d8e1ec",
            background: "#fff",
            fontSize: "14px",
            fontWeight: "500",
            color: "#344054",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <RefreshCw size={16} style={{ marginRight: "8px" }} />
          {loading ? "Working..." : "Sync Google reviews"}
        </button>
        {message && (
          <div
            style={{
              padding: "12px 16px",
              background: "#ecfdf3",
              border: "1px solid #d1fae5",
              borderRadius: "8px",
              color: "#065f46",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#dc2626",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
