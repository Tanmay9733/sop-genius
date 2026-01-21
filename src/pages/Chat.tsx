import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ChatMessage, { Message, Citation } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import SourcePanel from "@/components/chat/SourcePanel";
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
  const [showSources, setShowSources] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSendMessage = async (content: string) => {
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

  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar isLoggedIn onLogout={handleLogout} />

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Ask about your company procedures
                </h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  I can answer questions using your uploaded SOP documents. Every answer includes source citations you can verify.
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {[
                    "How do I process a refund?",
                    "What's the password policy?",
                    "How do I submit expenses?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSendMessage(suggestion)}
                      className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onCitationClick={handleCitationClick}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>

        {/* Source Toggle Button (Mobile) */}
        {allCitations.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSources(!showSources)}
            className="fixed bottom-24 right-4 md:hidden z-40 shadow-lg"
          >
            <Book className="w-4 h-4 mr-2" />
            Sources ({allCitations.length})
          </Button>
        )}

        {/* Source Panel (Desktop) */}
        <div className="hidden md:block">
          <SourcePanel
            citations={allCitations}
            isOpen={allCitations.length > 0}
            onClose={() => {}}
            onCitationClick={handleCitationClick}
          />
        </div>
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
