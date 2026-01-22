import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Settings2, MoreVertical, ArrowRight, Menu, PanelLeft, PanelRight } from "lucide-react";
import ChatMessage, { Message, Citation } from "@/components/chat/ChatMessage";
import SourcesPanel from "@/components/chat/SourcesPanel";
import StudioPanel from "@/components/chat/StudioPanel";
import PDFPreviewModal from "@/components/chat/PDFPreviewModal";
import { Button } from "@/components/ui/button";

// Demo data
const demoResponses: Record<string, { content: string; citations: Citation[] }> = {
  refund: {
    content: "To process a customer refund, follow these steps:\n\n1. Verify the original purchase in the Order Management System\n2. Confirm the return is within the 30-day policy window\n3. Open the Returns Portal and select 'Process Refund'\n4. Enter the order number and reason code\n5. Approve the refund - it will process within 3-5 business days",
    citations: [
      { id: "1", documentName: "Returns Policy.pdf", pageNumber: 12, sectionTitle: "Refund Processing Steps" },
      { id: "2", documentName: "Customer Service Manual.pdf", pageNumber: 45, sectionTitle: "Order System Access" },
    ],
  },
  password: {
    content: "To reset your corporate password:\n\n1. Go to the IT Self-Service Portal at help.company.com\n2. Click 'Forgot Password'\n3. Enter your employee ID\n4. Complete the verification via your registered mobile\n5. Create a new password (minimum 12 characters, 1 uppercase, 1 number, 1 symbol)\n\nNote: You must change your password every 90 days.",
    citations: [
      { id: "3", documentName: "IT Security Policy.pdf", pageNumber: 8, sectionTitle: "Password Requirements" },
    ],
  },
  default: {
    content: "I don't know. This information does not exist in the uploaded SOPs. Please contact your manager or the relevant department for assistance with this question.",
    citations: [],
  },
};

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [showSourcesPanel, setShowSourcesPanel] = useState(true);
  const [showStudioPanel, setShowStudioPanel] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState<"sources" | "studio" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Demo sources
  const [sources] = useState<{ id: string; name: string; type: "pdf" | "website" | "text"; status: "ready" | "processing" }[]>([]);

  // Get all citations from messages
  const allCitations = messages
    .filter((m) => m.role === "assistant" && m.citations)
    .flatMap((m) => m.citations || []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const content = input.trim();
    setInput("");
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check for keywords to determine response
    const lowerContent = content.toLowerCase();
    let response = demoResponses.default;
    if (lowerContent.includes("refund") || lowerContent.includes("return")) {
      response = demoResponses.refund;
    } else if (lowerContent.includes("password") || lowerContent.includes("login")) {
      response = demoResponses.password;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.content,
      citations: response.citations,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation);
    setShowMobileMenu(null);
  };

  const handleAddSource = () => {
    // Navigate to upload or open upload modal
    navigate("/admin/upload");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-border bg-card">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMobileMenu(showMobileMenu === "sources" ? null : "sources")}
        >
          <PanelLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-foreground">Chat</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMobileMenu(showMobileMenu === "studio" ? null : "studio")}
        >
          <PanelRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sources Panel - Desktop */}
        <div className={`hidden md:flex w-80 flex-shrink-0 transition-all duration-300 ${showSourcesPanel ? '' : '-ml-80'}`}>
          <SourcesPanel
            sources={sources}
            citations={allCitations}
            onAddSource={handleAddSource}
            onCitationClick={handleCitationClick}
            className="w-full"
          />
        </div>

        {/* Sources Panel - Mobile Overlay */}
        {showMobileMenu === "sources" && (
          <div className="md:hidden absolute inset-0 z-40 flex">
            <div className="w-80 max-w-[85vw]">
              <SourcesPanel
                sources={sources}
                citations={allCitations}
                onAddSource={handleAddSource}
                onCitationClick={handleCitationClick}
                onClose={() => setShowMobileMenu(null)}
                className="w-full h-full"
              />
            </div>
            <div 
              className="flex-1 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setShowMobileMenu(null)}
            />
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 border-x border-border bg-background">
          {/* Chat Header - Desktop */}
          <div className="hidden md:flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowSourcesPanel(!showSourcesPanel)}
              >
                <PanelLeft className="w-4 h-4" />
              </Button>
              <h1 className="font-semibold text-foreground">Chat</h1>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowStudioPanel(!showStudioPanel)}
              >
                <PanelRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-14 h-14 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Add a source to get started
                </h2>
                <Button 
                  onClick={handleAddSource}
                  variant="outline"
                  className="mt-4"
                >
                  Upload a source
                </Button>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onCitationClick={handleCitationClick}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="chat-bubble-assistant px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-card/50">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 bg-secondary/50 rounded-xl border border-border p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Upload a source to get started"
                  rows={1}
                  className="flex-1 resize-none bg-transparent border-0 outline-none text-sm px-2 py-2 placeholder:text-muted-foreground min-h-[40px] max-h-[120px]"
                  style={{ height: "auto" }}
                />
                <div className="flex items-center gap-2 pr-2">
                  <span className="text-xs text-muted-foreground">{sources.length} sources</span>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Panel - Desktop */}
        <div className={`hidden md:flex w-80 flex-shrink-0 transition-all duration-300 ${showStudioPanel ? '' : '-mr-80'}`}>
          <StudioPanel className="w-full" />
        </div>

        {/* Studio Panel - Mobile Overlay */}
        {showMobileMenu === "studio" && (
          <div className="md:hidden absolute inset-0 z-40 flex justify-end">
            <div 
              className="flex-1 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setShowMobileMenu(null)}
            />
            <div className="w-80 max-w-[85vw]">
              <StudioPanel 
                onClose={() => setShowMobileMenu(null)}
                className="w-full h-full" 
              />
            </div>
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        citation={selectedCitation}
        isOpen={!!selectedCitation}
        onClose={() => setSelectedCitation(null)}
      />
    </div>
  );
};

export default Chat;
