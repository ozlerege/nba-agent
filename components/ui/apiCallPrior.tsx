import { Alert } from "./alert";

type Props = {
  loading: boolean;
  error: string;
};

export function ApiCallPrior({ loading, error }: Props) {
  return (
    <div className="space-y-2 mt-2 justify-center">
      {loading && (
        <div className="flex items-center gap-3 rounded-md border border-border/60 bg-muted/30 p-3 justify-center">
          <span
            aria-hidden
            className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"
          />
          <div className="leading-tight">
            <p className="text-sm font-medium">Loading</p>
            <p className="text-xs text-muted-foreground">
              Hang tight, fetching data…
            </p>
          </div>
        </div>
      )}
      {error && <Alert variant="destructive">{error}</Alert>}
    </div>
  );
}
