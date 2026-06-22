import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface FetchErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function FetchError({
  message = "Gagal memuat data dari server. Silakan periksa koneksi Anda.",
  onRetry,
}: FetchErrorProps) {
  return (
    <Card className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 shadow-none transition-colors duration-200">
      <CardContent className="flex flex-col items-center justify-center p-0 text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-bold text-foreground">
          System Fetch Failure
        </h4>
        <p className="mt-2 max-w-sm font-mono text-xs text-muted-foreground">
          {message}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            size="sm"
            className="mt-5 cursor-pointer font-sans text-xs gap-1.5 transition-all duration-200"
          >
            <RefreshCw className="h-3 w-3" />
            Coba Lagi
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
