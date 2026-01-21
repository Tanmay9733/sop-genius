import { useNavigate } from "react-router-dom";
import { FileText, Upload, MessageSquare, TrendingUp, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Documents", value: "24", icon: FileText, trend: "+3 this week" },
    { label: "Questions Answered", value: "1,247", icon: MessageSquare, trend: "+156 today" },
    { label: "Avg Response Time", value: "1.2s", icon: Clock, trend: "-0.3s improved" },
    { label: "Accuracy Rate", value: "98.5%", icon: TrendingUp, trend: "+1.2% this month" },
  ];

  const recentDocuments = [
    { name: "Returns Policy.pdf", status: "ready", uploadedAt: "2 hours ago" },
    { name: "IT Security Manual.pdf", status: "processing", uploadedAt: "5 hours ago" },
    { name: "Employee Handbook.pdf", status: "ready", uploadedAt: "1 day ago" },
    { name: "Safety Procedures.pdf", status: "ready", uploadedAt: "2 days ago" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAdmin isLoggedIn onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your SOP documents and monitor usage</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/upload">
              <Button className="btn-gradient">
                <Upload className="w-4 h-4 mr-2" />
                Upload SOPs
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5 card-hover">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-accent mt-1">{stat.trend}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Documents */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Recent Documents</h2>
            <Link to="/admin/documents">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentDocuments.map((doc) => (
              <div key={doc.name} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.uploadedAt}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                  doc.status === "ready" 
                    ? "bg-emerald-50 text-emerald-600" 
                    : "bg-amber-50 text-amber-600"
                }`}>
                  {doc.status === "ready" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {doc.status === "ready" ? "Ready" : "Processing"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
