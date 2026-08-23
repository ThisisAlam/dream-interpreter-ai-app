import { useState } from "react";
import type { Dream } from "../types/dream";
import { formatDate } from "../utils/formatDate";

interface DreamCardProps {
  dream: Dream;
  onDelete: (id: number) => Promise<void>;
}

export default function DreamCard({
  dream,
  onDelete,
}: DreamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncationLength = 300;

  const shouldTruncate =
    dream.interpretation.length > truncationLength;

  const displayedInterpretation =
    shouldTruncate && !isExpanded
      ? `${dream.interpretation.slice(
          0,
          truncationLength
        )}...`
      : dream.interpretation;

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dream?"
    );

    if (!confirmed) {
      return;
    }

    await onDelete(dream.id);
  }

  return (
    <div className="dream-card">
      <div className="dream-header">
        <span className="dream-date">
          {formatDate(dream.created_at)}
        </span>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      <div className="dream-text">
        <strong>Dream:</strong> {dream.dream_text}
      </div>

      <div className="interpretation">
        <h3>💭 Interpretation</h3>

        <div className="interpretation-text">
          {displayedInterpretation}
        </div>

        {shouldTruncate && (
          <button
            className="read-more-btn"
            onClick={() =>
              setIsExpanded((previous) => !previous)
            }
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
}