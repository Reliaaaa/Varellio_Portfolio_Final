import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export function Header() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-[1440px] mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter text-slate-900">
          V671 PORTFOLIO
        </Link>
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
        <a 
          href="mailto:varelliolouis@gmail.com"
          className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:scale-95 duration-200 ease-out-expo transition-transform"
        >
          Email
        </a>
      </div>
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
