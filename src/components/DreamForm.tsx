import { useState } from "react";

interface DreamFormProps {
  onSubmit: (dream: string) => Promise<void>;
  isLoading: boolean;
}

export default function DreamForm({
  onSubmit,
  isLoading,
}: DreamFormProps) {
  const [dream, setDream] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedDream = dream.trim();

    if (!trimmedDream) {
      return;
    }

    await onSubmit(trimmedDream);

    setDream("");
  }

  return (
    <section className="add-dream">
      <h2>Add a New Dream</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={dream}
          onChange={(event) => setDream(event.target.value)}
          placeholder="Describe your dream in detail..."
          required
        />

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Interpreting..."
            : "Get Interpretation"}
        </button>
      </form>
    </section>
  );
}