import { FileText, Trash2, RefreshCw, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Document {
  id: string;
  name: string;
  status: "processing" | "ready" | "error";
  uploadedAt: Date;
  pages?: number;
  size?: string;
}

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
  onReprocess?: (id: string) => void;
}

const DocumentCard = ({ document, onDelete, onReprocess }: DocumentCardProps) => {
  const statusConfig = {
    processing: {
      icon: Clock,
      label: "Processing",
      className: "text-amber-600 bg-amber-50",
    },
    ready: {
      icon: CheckCircle,
      label: "Ready",
      className: "text-emerald-600 bg-emerald-50",
    },
    error: {
      icon: AlertCircle,
      label: "Error",
      className: "text-destructive bg-destructive/10",
    },
  };

  const status = statusConfig[document.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-card border border-border rounded-xl p-4 card-hover">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-foreground truncate">{document.name}</h4>
              <div className="flex items-center gap-3 mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.className}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
                {document.pages && (
                  <span className="text-xs text-muted-foreground">{document.pages} pages</span>
                )}
                {document.size && (
                  <span className="text-xs text-muted-foreground">{document.size}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              Uploaded {document.uploadedAt.toLocaleDateString()}
            </span>
            <div className="flex items-center gap-1">
              {document.status === "error" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReprocess?.(document.id)}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(document.id)}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
