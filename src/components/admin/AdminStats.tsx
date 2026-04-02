import { FileText, Tag, Calendar, Database } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface StatsProps {
  totalArticles: number;
  categories: number;
}

const AdminStats = ({ totalArticles, categories }: StatsProps) => {
  const stats = [
    { label: "Articles Published", value: totalArticles, icon: FileText, color: "text-primary" },
    { label: "Active Categories", value: categories, icon: Tag, color: "text-[#D4AF37]" },
    { label: "Last Analysis", value: "Today", icon: Calendar, color: "text-muted-foreground" },
    { label: "Database Sync", value: "Secure", icon: Database, color: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <AnimatedSection key={stat.label} delay={i * 0.05}>
          <div className="p-6 bg-card/50 border border-border rounded-sm backdrop-blur-sm card-hover flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`p-3 bg-secondary rounded-sm border border-border/50 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default AdminStats;
