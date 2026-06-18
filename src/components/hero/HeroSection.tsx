import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeVisual } from "@/components/hero/CodeVisual";
import { ParticleNetwork } from "@/components/hero/ParticleNetwork";
import { scrollToSection } from "@/lib/utils";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/ZAINZESHAN", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/zainzeeshan/", label: "LinkedIn" },
  { icon: HiOutlineMail, href: "mailto:zainzeeshan652@gmail.com", label: "Email" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-background pt-[4.5rem]"
    >
      <ParticleNetwork className="pointer-events-auto z-0" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background/80" />

      <div className="container-main relative z-10 grid flex-1 items-center gap-10 py-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          <motion.p
            variants={itemVariants}
            className="mb-3 font-mono text-sm font-medium tracking-widest text-primary"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-tight"
          >
            Zain Zeeshan
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="mb-5 text-lg font-semibold text-primary sm:text-xl"
          >
            MERN Stack Developer | FastAPI Developer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-xl text-base leading-relaxed text-muted"
          >
            I build scalable, high-performance web applications using React,
            FastAPI, PostgreSQL, MongoDB, and modern web technologies. Passionate
            about clean architecture, elegant UI, and delivering production-ready
            solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => scrollToSection("projects")}>
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-primary hover:bg-card hover:text-primary"
              >
                <social.icon className="h-[18px] w-[18px]" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <CodeVisual />
        </motion.div>
      </div>
    </section>
  );
}
