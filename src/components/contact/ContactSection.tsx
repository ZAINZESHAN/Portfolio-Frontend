import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoCard } from "@/components/contact/ContactInfoCard";
import { fadeInLeft, staggerContainer, viewportOnce } from "@/hooks/useInViewAnimation";

const contactItems = [
  {
    icon: HiOutlineMail,
    label: "Email",
    value: "zainzeeshan652@gmail.com",
    href: "mailto:zainzeeshan652@gmail.com",
  },
  {
    icon: HiOutlineLocationMarker,
    label: "Location",
    value: "Pakistan · Open to Remote",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/zainzeeshan",
    href: "https://www.linkedin.com/in/zainzeeshan/",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/ZAINZESHAN",
    href: "https://github.com/ZAINZESHAN",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(118,132,107,0.08)_0%,_transparent_50%)]" />
      <div className="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-primary/6 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(118,132,107,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(118,132,107,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted sm:text-lg">
            Have a project idea, job opportunity, or collaboration in mind? Feel
            free to reach out.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 h-1 rounded-full bg-primary"
          />
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-4"
          >
            <motion.p
              variants={fadeInLeft}
              className="mb-6 text-base leading-relaxed text-muted"
            >
              I&apos;m always open to discussing new opportunities, freelance
              projects, and innovative ideas.
            </motion.p>

            {contactItems.map((item, index) => (
              <ContactInfoCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
                href={item.href}
                index={index}
              />
            ))}
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
