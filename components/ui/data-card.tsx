import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ApiCallPrior } from "@/components/ui/apiCallPrior";

interface DataCardProps {
  title: string;
  isLoading?: boolean;
  error?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function DataCard({
  title,
  isLoading = false,
  error,
  children,
  footer,
  className = "",
}: DataCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ApiCallPrior loading={isLoading} error={error ?? ""} />
        {!isLoading && !error && children}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
