import { Link } from "react-router-dom";
import { ArrowRight, FileText, Shield, Zap, Search, CheckCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

const Landing = () => {
  const features = [
    {
      icon: Search,
      title: "Instant Answers",
      description: "Get accurate answers from your company SOPs in seconds, not hours of searching.",
    },
    {
      icon: FileText,
      title: "Source Citations",
      description: "Every answer comes with exact page numbers and section references you can verify.",
    },
    {
      icon: Shield,
      title: "No Hallucinations",
      description: "AI answers only from your uploaded documents. If it's not in the SOP, it says 'I don't know.'",
    },
    {
      icon: Zap,
      title: "Always Up-to-Date",
      description: "Upload new SOPs anytime. The AI immediately learns from your latest procedures.",
    },
  ];

  const steps = [
    { number: "01", title: "Upload SOPs", description: "Drag and drop your PDF procedures" },
    { number: "02", title: "Ask Questions", description: "Employees ask in natural language" },
    { number: "03", title: "Get Verified Answers", description: "Receive cited, accurate responses" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
            <Shield className="w-4 h-4" />
            Trusted by teams who need accurate answers
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Your Company Knowledge,{" "}
            <span className="text-gradient">Instantly Accessible</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            The AI assistant that answers employee questions using your Standard Operating Procedures—with citations and zero guesswork.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/login">
              <Button size="lg" className="btn-gradient text-base px-8">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-base px-8">
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden max-w-3xl mx-auto">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/50" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">SOP Agent</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-end">
                  <div className="chat-bubble-user px-4 py-3 max-w-md">
                    <p className="text-sm text-primary-foreground">How do I process a customer refund?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="chat-bubble-assistant px-4 py-3 max-w-md">
                    <p className="text-sm text-foreground mb-3">To process a customer refund, follow these steps:</p>
                    <ol className="text-sm text-foreground space-y-1 list-decimal list-inside mb-3">
                      <li>Verify the purchase in the order system</li>
                      <li>Confirm return eligibility (within 30 days)</li>
                      <li>Process refund via the Returns Portal</li>
                    </ol>
                    <div className="flex gap-2 mt-2">
                      <span className="citation-badge">
                        <FileText className="w-3 h-3" />
                        Returns Policy.pdf • p.12
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Teams Trust SOP Agent
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for accuracy, designed for transparency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-xl border border-border card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple as 1-2-3
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes, not days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center">
                <div className="text-5xl font-bold text-gradient mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center bg-card rounded-2xl border border-border p-12">
          <MessageSquare className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to transform your company knowledge?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Give your team instant access to accurate, verified answers.
          </p>
          <Link to="/login">
            <Button size="lg" className="btn-gradient text-base px-8">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SOP Agent</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SOP Agent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
