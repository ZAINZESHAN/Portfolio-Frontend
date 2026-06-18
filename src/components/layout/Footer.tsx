import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { ArrowUp, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { viewportOnce } from "@/hooks/useInViewAnimation";
import { cn, scrollToSection } from "@/lib/utils";

const footerLinks = [
  { label: "Home", href: "home", path: "/" },
  { label: "About", href: "about", path: "/about" },
  { label: "Experience", href: "experience", path: "/" },
  { label: "Projects", href: "projects", path: "/projects" },
  { label: "Contact", href: "contact", path: "/contact" },
];

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/ZAINZESHAN",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/zainzeeshan/",
    label: "LinkedIn",
  },
  {
    icon: HiOutlineMail,
    href: "mailto:zainzeeshan652@gmail.com",
    label: "Email",
  },
];

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="icon"
              size="icon"
              aria-label="Back to top"
              onClick={() => scrollToSection("home")}
              className="h-12 w-12 rounded-full border-primary/30 bg-card/90 text-primary shadow-lg shadow-black/20 backdrop-blur-md hover:border-primary hover:bg-primary/15 hover:text-primary-hover"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (href: string, path: string) => {
    navigate(path);
    setTimeout(() => scrollToSection(href), 200);
  };

  return (
    <>
      <footer className="relative border-t border-primary/15 bg-surface/40">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="container-main py-14 sm:py-16"
        >
          <div className="mb-10 flex justify-center sm:justify-start lg:mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary-hover"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for opportunities
            </motion.span>
          </div>

          <div className="grid gap-10 text-center sm:text-left md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-3">
                <div className="dark-ui relative flex h-11 w-11 items-center justify-center rounded-xl shadow-inner">
                  <span className="dark-ui-primary font-mono text-base font-bold">ZZ</span>
                  <Code2 className="dark-ui-primary dark-ui-surface absolute -bottom-1 -right-1 h-4 w-4 rounded-full p-0.5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">Zain Zeeshan</p>
                  <p className="text-sm text-muted">Full Stack Developer</p>
                </div>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                Building scalable web applications with modern technologies.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start md:items-center lg:items-center">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-1">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.path)}
                      className="group relative px-2 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <span className="absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start md:col-span-2 md:items-center lg:col-span-1 lg:items-end">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted transition-all duration-300",
                      "hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border/60 pt-8">
            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              <p className="text-sm text-muted">
                © 2026 Zain Zeeshan. All rights reserved.
              </p>
              <p className="text-xs text-muted/80">
                Built with{" "}
                <span className="text-muted">React</span>
                <span className="mx-1.5 text-border">·</span>
                <span className="text-muted">FastAPI</span>
                <span className="mx-1.5 text-border">·</span>
                <span className="text-muted">PostgreSQL</span>
              </p>
            </div>
          </div>
        </motion.div>
      </footer>

      <BackToTop />
    </>
  );
}
