import { FileText, ExternalLink } from "lucide-react";

export interface Citation {
  id: string;
  documentName: string;
  pageNumber: number;
  sectionTitle?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  onCitationClick?: (citation: Citation) => void;
}

const ChatMessage = ({ message, onCitationClick }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      <div
        className={`max-w-[85%] md:max-w-[70%] ${
          isUser ? "chat-bubble-user" : "chat-bubble-assistant"
        } px-4 py-3`}
      >
        {/* Message Content */}
        <p className={`text-sm leading-relaxed ${isUser ? "text-primary-foreground" : "text-foreground"}`}>
          {message.content}
        </p>

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/30">
            <p className="text-xs font-medium text-muted-foreground mb-2">Sources:</p>
            <div className="flex flex-wrap gap-2">
              {message.citations.map((citation) => (
                <button
                  key={citation.id}
                  onClick={() => onCitationClick?.(citation)}
                  className="citation-badge cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <FileText className="w-3 h-3" />
                  <span>{citation.documentName}</span>
                  <span className="text-muted-foreground">p.{citation.pageNumber}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <p
          className={`text-[10px] mt-2 ${
            isUser ? "text-primary-foreground/60" : "text-muted-foreground"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
