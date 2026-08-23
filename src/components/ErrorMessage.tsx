interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({
  message,
  onClose,
}: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="error-alert">
      <strong>⚠️ Error:</strong> {message}

      <button
        className="close-error"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}