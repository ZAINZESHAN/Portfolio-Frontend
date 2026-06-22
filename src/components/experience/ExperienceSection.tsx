import { motion } from "framer-motion";
import { ExperienceCard, type TimelineEntryData } from "@/components/experience/ExperienceCard";
import { fadeInUp, viewportOnce } from "@/hooks/useInViewAnimation";

const experiences: TimelineEntryData[] = [
  {
    phase: "Internship",
    company: "Computing Yard",
    role: "MERN Stack Developer Intern",
    duration: "3 Months",
    description: [
      "Started career after completing MERN Stack course",
      "Learned real-world development workflow",
      "Worked on frontend UI development using React",
      "Assisted in backend API integration",
      "Improved debugging and problem-solving skills",
    ],
  },
  {
    phase: "Full-Time",
    company: "Computing Yard",
    role: "Software Engineer",
    duration: "1.5+ Years (Present)",
    isCurrent: true,
    description: [
      "Working as a full-time MERN Stack Developer",
      "Building scalable full-stack web applications",
      "Developing REST APIs using Node.js/Express",
      "Integrating authentication systems (JWT, login/signup flows)",
      "Working with MongoDB database design and optimization",
      "Collaborating with team for new features and production support",
      "Improving UI/UX with React and Tailwind CSS",
    ],
  },
];

const techExposure = [
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JWT Authentication",
  "REST APIs",
  "Tailwind CSS",
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-border bg-surface/30 py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(118,132,107) 1px, transparent 1px), linear-gradient(90deg, rgb(118,132,107) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-primary/8 blur-3xl" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center sm:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Experience
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted sm:text-lg">
            My professional journey as a Full Stack Developer
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 h-1 rounded-full bg-primary"
          />
        </motion.div>

        <div className="relative w-full">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 top-0 hidden w-px origin-top -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 md:block"
          />

          <div className="space-y-10 md:space-y-14">
            {experiences.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={entry.role}
                  className="relative grid grid-cols-1 items-stretch md:grid-cols-2 md:gap-6"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className={`absolute top-8 z-10 hidden h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 md:flex ${
                      entry.isCurrent
                        ? "left-1/2 border-primary bg-primary shadow-md shadow-primary/30"
                        : "left-1/2 border-primary/50 bg-surface"
                    }`}
                  >
                    {entry.isCurrent && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </motion.div>

                  {isLeft ? (
                    <>
                      <div className="w-full md:pr-4">
                        <ExperienceCard entry={entry} index={index} />
                      </div>
                      <div className="hidden md:block" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" aria-hidden="true" />
                      <div className="w-full md:pl-4">
                        <ExperienceCard entry={entry} index={index} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-3xl text-center sm:mt-20"
        >
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Tech Exposure During Experience
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {techExposure.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-full border border-border/80 bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary/40 hover:bg-surface hover:text-foreground sm:text-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
