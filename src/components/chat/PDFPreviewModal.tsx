import { X, FileText, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Citation } from "./ChatMessage";
import { Button } from "@/components/ui/button";

interface PDFPreviewModalProps {
  citation: Citation | null;
  isOpen: boolean;
  onClose: () => void;
}

const PDFPreviewModal = ({ citation, isOpen, onClose }: PDFPreviewModalProps) => {
  if (!isOpen || !citation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl h-[80vh] bg-card rounded-xl shadow-xl border border-border flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{citation.documentName}</h3>
              <p className="text-sm text-muted-foreground">
                Page {citation.pageNumber}
                {citation.sectionTitle && ` • ${citation.sectionTitle}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Full PDF
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* PDF Preview Area */}
        <div className="flex-1 bg-muted/30 flex items-center justify-center p-8">
          {/* Placeholder for actual PDF rendering */}
          <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl aspect-[8.5/11] flex flex-col items-center justify-center border border-border">
            <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-sm">PDF Preview</p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Page {citation.pageNumber} of {citation.documentName}
            </p>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {citation.pageNumber}
          </span>
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;
