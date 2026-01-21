import { FileText, X, ChevronRight, Book } from "lucide-react";
import { Citation } from "./ChatMessage";
import { Button } from "@/components/ui/button";

interface SourcePanelProps {
  citations: Citation[];
  isOpen: boolean;
  onClose: () => void;
  onCitationClick: (citation: Citation) => void;
}

const SourcePanel = ({ citations, isOpen, onClose, onCitationClick }: SourcePanelProps) => {
  if (!isOpen) return null;

  // Group citations by document
  const groupedCitations = citations.reduce((acc, citation) => {
    if (!acc[citation.documentName]) {
      acc[citation.documentName] = [];
    }
    acc[citation.documentName].push(citation);
    return acc;
  }, {} as Record<string, Citation[]>);

  return (
    <div className="w-80 border-l border-border bg-card h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Sources</h3>
          <span className="text-xs text-muted-foreground">({citations.length})</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Citations List */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedCitations).map(([docName, docCitations]) => (
          <div key={docName} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground truncate">{docName}</span>
            </div>
            <div className="space-y-2 ml-6">
              {docCitations.map((citation) => (
                <button
                  key={citation.id}
                  onClick={() => onCitationClick(citation)}
                  className="w-full text-left p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Page {citation.pageNumber}</span>
                    <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {citation.sectionTitle && (
                    <p className="text-xs text-foreground mt-1 line-clamp-2">{citation.sectionTitle}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {citations.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No sources referenced yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcePanel;
