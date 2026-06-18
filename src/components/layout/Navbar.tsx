import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useTheme } from "@/hooks/useTheme";
import { cn, scrollToSection } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "home", path: "/" },
  { label: "About", href: "about", path: "/about" },
  { label: "Experience", href: "experience", path: "/" },
  { label: "Projects", href: "projects", path: "/projects" },
  { label: "Contact", href: "contact", path: "/contact" },
];

export function Navbar() {
  const navigate = useNavigate();
  const scrolled = useScrollPosition();
  const activeSection = useActiveSection(navItems.map((item) => item.href));
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string, path: string) => {
    navigate(path);
    setTimeout(() => scrollToSection(href), 200);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/70 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="container-main flex h-[4.5rem] items-center justify-between">
        <Logo />

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.path)}
                  className="relative px-3 py-2 text-base font-medium text-muted transition-colors hover:text-foreground lg:px-4"
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <Button
            variant="icon"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="icon" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8 flex flex-col gap-2">
                <Logo className="mb-6" />
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleNavClick(item.href, item.path)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-left text-lg font-medium transition-colors",
                      activeSection === item.href
                        ? "bg-card text-primary"
                        : "text-muted hover:bg-card hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
