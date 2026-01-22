import { 
  Headphones, 
  Video, 
  Network, 
  FileBarChart, 
  CreditCard, 
  HelpCircle, 
  BarChart3, 
  Presentation, 
  Table2,
  PanelLeftClose,
  StickyNote
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudioPanelProps {
  onClose?: () => void;
  className?: string;
}

const studioTools = [
  { id: "audio", icon: Headphones, label: "Audio Overview" },
  { id: "video", icon: Video, label: "Video Overview" },
  { id: "mindmap", icon: Network, label: "Mind Map" },
  { id: "reports", icon: FileBarChart, label: "Reports" },
  { id: "flashcards", icon: CreditCard, label: "Flashcards" },
  { id: "quiz", icon: HelpCircle, label: "Quiz" },
  { id: "infographic", icon: BarChart3, label: "Infographic" },
  { id: "slides", icon: Presentation, label: "Slide deck" },
  { id: "datatable", icon: Table2, label: "Data table" },
];

const StudioPanel = ({ onClose, className = "" }: StudioPanelProps) => {
  return (
    <div className={`bg-card border-l border-border flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold text-foreground">Studio</h2>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Language Promo */}
      <div className="mx-4 mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/20 to-chat-citation/20 border border-primary/30">
        <p className="text-xs text-foreground">
          <span className="font-medium">Create an Audio Overview in:</span>{" "}
          <span className="text-primary cursor-pointer hover:underline">हिंदी</span>,{" "}
          <span className="text-primary cursor-pointer hover:underline">বাংলা</span>,{" "}
          <span className="text-primary cursor-pointer hover:underline">ગુજરાતી</span>,{" "}
          <span className="text-primary cursor-pointer hover:underline">தமிழ்</span>,{" "}
          <span className="text-muted-foreground">+more</span>
        </p>
      </div>

      {/* Tools Grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-3">
          {studioTools.map((tool) => (
            <button
              key={tool.id}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors border border-transparent hover:border-border"
            >
              <tool.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-foreground font-medium">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Studio Output */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center mb-3">
            <Presentation className="w-5 h-5 text-muted-foreground/50" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Studio output will be saved here.</p>
          <p className="text-xs text-muted-foreground/70 mt-1 px-4">
            After adding sources, click to add Audio Overview, study guides and more!
          </p>
        </div>
      </div>

      {/* Add Note Button */}
      <div className="p-4 pt-0">
        <Button variant="outline" className="w-full gap-2 justify-center">
          <StickyNote className="w-4 h-4" />
          Add note
        </Button>
      </div>
    </div>
  );
};

export default StudioPanel;
