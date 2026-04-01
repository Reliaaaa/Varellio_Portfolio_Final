import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/20">
      <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-[1440px] mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter text-slate-900">
          V671 PORTFOLIO
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 font-light tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "transition-colors hover:text-slate-900",
                location.pathname === link.path ? "text-slate-900 font-bold border-b-2 border-primary pb-1" : "text-slate-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="mailto:varelliolouis@gmail.com"
            className="hidden md:inline-block px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:scale-95 duration-200 ease-out-expo transition-transform"
          >
            Email
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg py-2 transition-colors",
                location.pathname === link.path ? "text-primary font-bold" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="mailto:varelliolouis@gmail.com"
            className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-center hover:bg-primary/90 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Email Me
          </a>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/varellio-louis-tinangon-4172702a0?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { name: "GitHub", url: "https://github.com/Reliaaaa" },
    { name: "Instagram", url: "https://instagram.com/varellio671" },
    { name: "Email", url: "mailto:varelliolouis@gmail.com" },
  ];

  return (
    <footer className="w-full py-20 px-6 md:px-12 mt-10 bg-slate-50 border-t border-slate-200/20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-2">
          <div className="text-slate-400 text-sm tracking-widest uppercase">
            © 2026 V671 PORTFOLIO. All rights reserved.
          </div>
          <div className="text-4xl font-bold tracking-tighter">V671 PORTFOLIO</div>
        </div>
        <div className="flex flex-wrap gap-10">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-widest uppercase text-slate-400 hover:text-primary transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
