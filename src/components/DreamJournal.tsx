import type { Dream } from "../types/dream";
import DreamCard from "./DreamCard";

interface DreamJournalProps {
  dreams: Dream[];
  isLoading: boolean;
  onDelete: (id: number) => Promise<void>;
}

export default function DreamJournal({
  dreams,
  isLoading,
  onDelete,
}: DreamJournalProps) {
  return (
    <section className="dreams-list">
      <h2>Your Dream Journal</h2>

      <div id="dreamsContainer">
        {isLoading && (
          <p className="loading">
            Loading dreams...
          </p>
        )}

        {!isLoading && dreams.length === 0 && (
          <p className="empty">
            No dreams yet. Start by recording your first dream!
          </p>
        )}

        {!isLoading &&
          dreams.map((dream) => (
            <DreamCard
              key={dream.id}
              dream={dream}
              onDelete={onDelete}
            />
          ))}
      </div>
    </section>
  );
}