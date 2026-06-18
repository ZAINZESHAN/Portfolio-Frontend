import { motion } from "framer-motion";
import { Code2, Database, Layers, Server } from "lucide-react";

const floatingCards = [
  {
    icon: Code2,
    label: "Clean Code",
    value: "UI/UX Focus",
    position: "top-6 left-2 lg:left-6",
    delay: 0,
  },
  {
    icon: Server,
    label: "Backend",
    value: "FastAPI APIs",
    position: "top-20 right-2 lg:right-4",
    delay: 0.15,
  },
  {
    icon: Database,
    label: "Databases",
    value: "SQL + NoSQL",
    position: "bottom-28 left-6 lg:left-10",
    delay: 0.3,
  },
  {
    icon: Layers,
    label: "Architecture",
    value: "Scalable Apps",
    position: "bottom-10 right-4 lg:right-8",
    delay: 0.45,
  },
];

export function AboutVisual() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-md lg:h-[460px]">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(118,132,107,0.12)_0%,transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(118,132,107) 1px, transparent 1px), linear-gradient(90deg, rgb(118,132,107) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute h-56 w-56 rounded-full border border-primary/15 lg:h-72 lg:w-72"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute h-40 w-40 rounded-full border border-dashed border-primary/20 lg:h-52 lg:w-52"
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="dark-ui relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-2xl shadow-2xl shadow-black/25 lg:h-36 lg:w-36"
        >
          <span className="dark-ui-primary font-mono text-2xl font-bold lg:text-3xl">
            {"{ }"}
          </span>
          <span className="dark-ui-muted mt-1 font-mono text-[10px]">dev.mode</span>
        </motion.div>
      </motion.div>

      {floatingCards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 + card.delay }}
          className={`absolute ${card.position} z-20`}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4.5 + card.delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.04, y: -4 }}
            className="dark-ui w-36 rounded-xl p-3 shadow-lg shadow-black/15 lg:w-40"
          >
            <div className="mb-2 flex items-center gap-2">
              <card.icon className="dark-ui-primary h-3.5 w-3.5" />
              <span className="dark-ui-muted font-mono text-[10px]">{card.label}</span>
            </div>
            <p className="text-xs font-medium text-[#F5F5F5]">{card.value}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
