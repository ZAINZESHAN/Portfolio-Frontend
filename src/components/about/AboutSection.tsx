import { motion } from "framer-motion";
import {
  Bug,
  Code2,
  Database,
  Layers,
  Lightbulb,
  Mic,
  Server,
  Wrench,
} from "lucide-react";
import { AboutVisual } from "@/components/about/AboutVisual";
import {
  fadeInLeft,
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "@/hooks/useInViewAnimation";

const skillGroups = [
  {
    category: "MERN Stack",
    icon: Layers,
    skills: ["MERN Stack", "React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    category: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: Server,
    skills: ["FastAPI"],
  },
  {
    category: "Database & Cloud",
    icon: Database,
    skills: ["PostgreSQL", "Firebase"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["Git", "Postman", "Docker (basic)"],
  },
  {
    category: "Soft Skills",
    icon: Lightbulb,
    skills: ["Public Speaking", "Problem Solving", "Bug Fixes"],
  },
];

const softSkillIcons: Record<string, typeof Mic> = {
  "Public Speaking": Mic,
  "Problem Solving": Lightbulb,
  "Bug Fixes": Bug,
};

function SkillBadge({ skill, showIcon = false }: { skill: string; showIcon?: boolean }) {
  const Icon = showIcon ? softSkillIcons[skill] : null;

  return (
    <motion.span
      whileHover={{ scale: 1.04, y: -2 }}
      className="group inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface/60 px-3 py-2 text-xs font-medium text-muted transition-all duration-300 hover:border-primary/40 hover:bg-card hover:text-foreground hover:shadow-md hover:shadow-primary/5 sm:text-sm"
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-primary opacity-70 transition-opacity group-hover:opacity-100" />}
      {skill}
    </motion.span>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Me
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted sm:text-lg">
            Passionate Full Stack Developer building scalable web applications
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 h-1 rounded-full bg-primary"
          />
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <AboutVisual />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="w-full min-w-0"
          >
            <div className="w-full text-left">
              <motion.div variants={fadeInUp} className="mb-8 space-y-4">
                <p className="text-base leading-relaxed text-muted">
                  I&apos;m a MERN Stack Developer with over 1 year of professional
                  experience building modern, scalable web applications. I work across
                  the full stack — from crafting clean, responsive interfaces to
                  designing robust APIs with FastAPI and PostgreSQL.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  I&apos;m passionate about clean UI/UX systems, writing maintainable
                  code, and solving complex problems with practical solutions. I&apos;m
                  especially interested in AI integrations and building next-generation
                  web experiences with modern tools and best practices.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="w-full">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Skills</h3>

                <div className="grid w-full grid-cols-1 justify-items-start gap-3 sm:grid-cols-2">
                  {skillGroups.map((group, index) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -3 }}
                    className={`w-full rounded-xl border border-border/80 bg-card/50 p-4 backdrop-blur-sm transition-shadow hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 ${
                      group.category === "Soft Skills" || group.category === "MERN Stack"
                        ? "sm:col-span-2"
                        : ""
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                        <group.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {group.category}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          showIcon={group.category === "Soft Skills"}
                        />
                      ))}
                    </div>
                  </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
