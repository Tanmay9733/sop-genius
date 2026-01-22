import { useState } from "react";
import { Plus, Search, FileText, Globe, Sparkles, ChevronDown, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Citation } from "./ChatMessage";

interface Source {
  id: string;
  name: string;
  type: "pdf" | "website" | "text";
  status: "ready" | "processing";
}

interface SourcesPanelProps {
  sources: Source[];
  citations: Citation[];
  onAddSource: () => void;
  onCitationClick: (citation: Citation) => void;
  onClose?: () => void;
  className?: string;
}

const SourcesPanel = ({ sources, citations, onAddSource, onCitationClick, onClose, className = "" }: SourcesPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Group citations by document
  const groupedCitations = citations.reduce((acc, citation) => {
    if (!acc[citation.documentName]) {
      acc[citation.documentName] = [];
    }
    acc[citation.documentName].push(citation);
    return acc;
  }, {} as Record<string, Citation[]>);

  return (
    <div className={`bg-card border-r border-border flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold text-foreground">Sources</h2>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <PanelRightClose className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Add Sources Button */}
      <div className="p-4 pb-2">
        <Button 
          onClick={onAddSource}
          className="w-full justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          variant="secondary"
        >
          <Plus className="w-4 h-4" />
          Add sources
        </Button>
      </div>

      {/* Deep Research Promo */}
      <div className="mx-4 mb-3 p-3 rounded-lg bg-gradient-to-r from-primary/20 to-chat-citation/20 border border-primary/30">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs text-foreground">
            <span className="font-medium text-primary">Try Deep Research</span> for an in-depth report and new sources!
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search the web for new sources"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50 border-border"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <Button variant="secondary" size="sm" className="gap-1 text-xs">
          <Globe className="w-3 h-3" />
          Web
          <ChevronDown className="w-3 h-3" />
        </Button>
        <Button variant="secondary" size="sm" className="gap-1 text-xs">
          <Sparkles className="w-3 h-3" />
          Fast research
          <ChevronDown className="w-3 h-3" />
        </Button>
      </div>

      {/* Sources List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {sources.length > 0 || Object.keys(groupedCitations).length > 0 ? (
          <div className="space-y-3">
            {/* Show uploaded sources */}
            {sources.map((source) => (
              <div key={source.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
                <FileText className="w-4 h-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{source.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{source.type}</p>
                </div>
              </div>
            ))}

            {/* Show citations from chat */}
            {Object.entries(groupedCitations).map(([docName, docCitations]) => (
              <div key={docName} className="space-y-1">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground truncate">{docName}</span>
                </div>
                <div className="pl-6 space-y-1">
                  {docCitations.map((citation) => (
                    <button
                      key={citation.id}
                      onClick={() => onCitationClick(citation)}
                      className="w-full text-left p-2 rounded-lg hover:bg-secondary/50 transition-colors text-xs text-muted-foreground"
                    >
                      Page {citation.pageNumber} {citation.sectionTitle && `• ${citation.sectionTitle}`}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Saved sources will appear here</p>
            <p className="text-xs text-muted-foreground/70 mt-1 px-4">
              Click Add source above to add PDFs, websites, text, videos or audio files. Or import a file directly from Google Drive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcesPanel;
