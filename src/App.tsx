import { useEffect, useState } from "react";

import Header from "./components/Header";
import DreamForm from "./components/DreamForm";
import DreamJournal from "./components/DreamJournal";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";

import type { Dream } from "./types/dream";

import "./App.css";

export default function App() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isLoadingDreams, setIsLoadingDreams] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  async function loadDreams() {
    try {
      setIsLoadingDreams(true);

      const response = await fetch("/api/dreams");

      if (!response.ok) {
        throw new Error("Failed to fetch dreams");
      }

      const data: Dream[] = await response.json();

      setDreams(data);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load dreams. Please refresh the page."
      );
    } finally {
      setIsLoadingDreams(false);
    }
  }

  async function addDream(dream: string) {
    try {
      setError("");
      setIsSubmitting(true);

      const response = await fetch("/api/dreams", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          dream_text: dream,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to process your dream."
        );
      }

      await loadDreams();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteDream(id: number) {
    try {
      setError("");

      const response = await fetch(
        `/api/dreams/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete dream"
        );
      }

      setDreams((currentDreams) =>
        currentDreams.filter(
          (dream) => dream.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to delete dream. Please try again."
      );
    }
  }

  useEffect(() => {
    loadDreams();
  }, []);

  return (
    <>
      <div className="container">
        <Header />

        <ErrorMessage
          message={error}
          onClose={() => setError("")}
        />

        <DreamForm
          onSubmit={addDream}
          isLoading={isSubmitting}
        />

        <DreamJournal
          dreams={dreams}
          isLoading={isLoadingDreams}
          onDelete={deleteDream}
        />
      </div>

      <Footer />
    </>
  );
}