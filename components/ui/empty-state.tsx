interface EmptyStateProps {
  title: string;
  message: string;
  className?: string;
}

export function EmptyState({
  title,
  message,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-lg border p-4 text-sm text-muted-foreground ${className}`}
    >
      <strong>{title}:</strong> {message}
    </div>
  );
}
