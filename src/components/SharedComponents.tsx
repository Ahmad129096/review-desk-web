import { useState } from "react";
import { Copy, Check, Wand2, Trash2, Send } from "lucide-react";
import { api } from "../api-query";

export function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={`pill ${status.toLowerCase()}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <div className="empty">{text}</div>;
}

export function ReviewItem({
  review,
  onStatusChange,
  onDeleted,
}: {
  review: any;
  onStatusChange: (review: any) => void;
  onDeleted: (id: string) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function markReplied() {
    const data: any = await api.updateReviewStatus(review.id, "REPLIED");
    onStatusChange(data.review);
  }

  async function regenerate() {
    setBusy(true);
    try {
      const data: any = await api.regenerateReviewReply(review.id);
      onStatusChange(data.review);
    } finally {
      setBusy(false);
    }
  }

  async function deleteReview() {
    setBusy(true);
    try {
      await api.deleteReview(review.id);
      onDeleted(review.id);
    } finally {
      setBusy(false);
    }
  }

  async function publishToGoogle() {
    setBusy(true);
    try {
      const data: any = await api.googlePublishReply(review.id);
      onStatusChange(data.review);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="panel reviewItem">
      <div className="itemHeader">
        <div>
          <strong>{review.reviewerName || "Anonymous customer"}</strong>
          <span>
            {review.rating} stars · {review.sentiment ?? "PENDING"} ·{" "}
            {review.urgency ?? "PENDING"}
          </span>
        </div>
        <StatusPill status={review.status} />
      </div>
      <p>{review.content}</p>
      {review.summary && <p className="muted">{review.summary}</p>}
      {review.aiReply && (
        <div className="replyBox">
          <p>{review.aiReply}</p>
          <div className="actions">
            <button
              onClick={() =>
                navigator.clipboard.writeText(review.aiReply ?? "")
              }
            >
              <Copy size={16} /> Copy
            </button>
            <button onClick={markReplied}>
              <Check size={16} /> Mark replied
            </button>
            <button onClick={regenerate} disabled={busy}>
              <Wand2 size={16} /> Regenerate
            </button>
            <button onClick={deleteReview} disabled={busy}>
              <Trash2 size={16} /> Delete
            </button>
            {(review.source === "GOOGLE" || review.externalReviewName) &&
              !review.replyPublishedAt && (
                <button onClick={publishToGoogle} disabled={busy}>
                  <Send size={16} /> Publish to Google
                </button>
              )}
          </div>
        </div>
      )}
      {!review.aiReply && (
        <div className="actions">
          <button onClick={regenerate} disabled={busy}>
            <Wand2 size={16} /> Generate reply
          </button>
          <button onClick={deleteReview} disabled={busy}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </article>
  );
}

export function TaskItem({
  task,
  onUpdated,
}: {
  task: any;
  onUpdated: (task: any) => void;
}) {
  return (
    <article className="panel taskItem" key={task.id}>
      <div className="itemHeader">
        <div>
          <strong>{task.title}</strong>
          <span>
            {task.business?.name} · {task.priority}
          </span>
        </div>
        <StatusPill status={task.status} />
      </div>
      {task.description && <p>{task.description}</p>}
      {task.review && (
        <p className="muted">
          {task.review.rating} stars · {task.review.content}
        </p>
      )}
      <div className="actions">
        <button
          onClick={async () =>
            onUpdated(await api.updateTask(task.id, { status: "IN_PROGRESS" }))
          }
        >
          In progress
        </button>
        <button
          onClick={async () =>
            onUpdated(await api.updateTask(task.id, { status: "DONE" }))
          }
        >
          <Check size={16} /> Done
        </button>
      </div>
    </article>
  );
}

export function Plan({
  name,
  price,
  limit,
  action,
}: {
  name: string;
  price: string;
  limit: string;
  action?: () => void;
}) {
  const features = [
    "AI review replies",
    "Sentiment detection",
    "Follow-up task tracking",
  ];

  return (
    <article className="panel plan">
      <h2>{name}</h2>
      <strong>
        {price}
        <span>/month</span>
      </strong>
      <p>{limit}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button className="primaryButton" disabled={!action} onClick={action}>
        {action ? "Upgrade" : "Included"}
      </button>
    </article>
  );
}
