import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput = ({
  onSend,
  isLoading = false,
  disabled = false,
  placeholder = "Ask about company procedures...",
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (input.trim() && !isLoading && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="glass border-t p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3 bg-background rounded-xl border border-border p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            rows={1}
            className="flex-1 resize-none bg-transparent border-0 outline-none text-sm px-2 py-2 placeholder:text-muted-foreground disabled:opacity-50"
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading || disabled}
            size="sm"
            className="btn-gradient shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Answers are generated from your company's SOP documents only
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
