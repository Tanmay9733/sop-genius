import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import UploadZone from "@/components/admin/UploadZone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AdminUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpload = async (files: File[]) => {
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Upload successful!",
      description: `${files.length} file(s) are being processed and will be available shortly.`,
    });
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAdmin isLoggedIn onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/admin">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Upload SOP Documents</h1>
          <p className="text-muted-foreground">
            Upload PDF documents to add them to the knowledge base. Documents will be processed and indexed automatically.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="bg-card border border-border rounded-xl p-6">
          <UploadZone onUpload={handleUpload} />
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
          <h3 className="font-medium text-foreground mb-2">Upload Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• PDF files only (max 50MB each)</li>
            <li>• Documents with clear headings work best</li>
            <li>• Text-based PDFs are preferred over scanned images</li>
            <li>• Processing typically takes 1-5 minutes per document</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminUpload;
