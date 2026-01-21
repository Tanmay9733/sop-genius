import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Search, Upload } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import DocumentCard, { Document } from "@/components/admin/DocumentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const demoDocuments: Document[] = [
  { id: "1", name: "Returns Policy.pdf", status: "ready", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), pages: 24, size: "2.4 MB" },
  { id: "2", name: "IT Security Manual.pdf", status: "processing", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), pages: 156, size: "12.8 MB" },
  { id: "3", name: "Employee Handbook.pdf", status: "ready", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), pages: 89, size: "6.2 MB" },
  { id: "4", name: "Safety Procedures.pdf", status: "ready", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), pages: 45, size: "3.1 MB" },
  { id: "5", name: "Customer Service Guide.pdf", status: "ready", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 72), pages: 67, size: "4.8 MB" },
  { id: "6", name: "Onboarding Checklist.pdf", status: "error", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 96), pages: 12, size: "1.2 MB" },
];

const AdminDocuments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>(demoDocuments);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been removed from the knowledge base.",
    });
  };

  const handleReprocess = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: "processing" as const } : doc
      )
    );
    toast({
      title: "Reprocessing started",
      description: "The document is being reprocessed.",
    });
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAdmin isLoggedIn onLogout={handleLogout} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/admin">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Document Library</h1>
            <p className="text-muted-foreground">
              {documents.length} documents in the knowledge base
            </p>
          </div>
          <Link to="/admin/upload">
            <Button className="btn-gradient">
              <Upload className="w-4 h-4 mr-2" />
              Upload More
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Documents Grid */}
        <div className="grid gap-4">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDelete={handleDelete}
              onReprocess={handleReprocess}
            />
          ))}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground">No documents found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDocuments;
