import { Link } from "react-router-dom";
import wardLogo from "@/assets/ward-logo.jpg";

const Footer = () => (
  <footer className="bg-surface border-t border-border">
    <div className="container mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={wardLogo} alt="Ward Capital Group" className="h-8 w-8 rounded-sm object-cover" />
            <span className="text-foreground font-bold tracking-tight">Ward Capital Group</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <p className="text-sm text-muted-foreground">info@wardcapital.org</p>
            A global investment firm deploying capital across venture, real estate, and energy.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-3">
            {["About", "Platforms", "Insights", "Contact"].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-sm text-secondary-foreground hover:text-primary transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Platforms</h4>
          <div className="flex flex-col gap-3">
            {["FutureTech", "NellyCrest", "Ward Petro"].map((item) => (
              <span key={item} className="text-sm text-secondary-foreground">{item}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-secondary-foreground">
            <span>info@wardcapital.org</span>
            <span>Ghana</span>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ward Capital Group. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
          <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
