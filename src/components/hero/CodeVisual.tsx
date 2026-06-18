import { motion } from "framer-motion";
import { Terminal, Braces, Database, Layers } from "lucide-react";

const codeCards = [
  {
    icon: Terminal,
    title: "api/main.py",
    code: [
      "@app.get('/projects')",
      "async def get_projects():",
      "    return await service.all()",
    ],
    delay: 0,
    position: "top-8 left-4 lg:left-8",
  },
  {
    icon: Braces,
    title: "App.tsx",
    code: [
      "const App = () => {",
      "  return <Portfolio />",
      "}",
    ],
    delay: 0.2,
    position: "top-32 right-4 lg:right-8",
  },
  {
    icon: Database,
    title: "schema.sql",
    code: [
      "CREATE TABLE projects (",
      "  id SERIAL PRIMARY KEY,",
      "  title VARCHAR(255)",
      ");",
    ],
    delay: 0.4,
    position: "bottom-24 left-8 lg:left-16",
  },
  {
    icon: Layers,
    title: "stack.config",
    code: [
      "React + TypeScript",
      "FastAPI + PostgreSQL",
      "Tailwind + Framer Motion",
    ],
    delay: 0.6,
    position: "bottom-12 right-6 lg:right-12",
  },
];

export function CodeVisual() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-lg lg:h-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute h-64 w-64 rounded-full border border-[#76846B]/20 lg:h-80 lg:w-80"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute h-48 w-48 rounded-full border border-dashed border-[#76846B]/25 lg:h-60 lg:w-60"
        />
        <div className="dark-ui relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl shadow-2xl shadow-black/20 lg:h-32 lg:w-32">
          <span className="dark-ui-primary font-mono text-3xl font-bold lg:text-4xl">
            {"</>"}
          </span>
        </div>
      </motion.div>

      {codeCards.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + card.delay }}
          className={`absolute ${card.position} z-20`}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4 + card.delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="dark-ui w-44 rounded-xl p-3 shadow-xl shadow-black/15 backdrop-blur-sm lg:w-52"
          >
            <div className="mb-2 flex items-center gap-2 border-b border-[#2A2E28]/80 pb-2">
              <card.icon className="dark-ui-primary h-3.5 w-3.5" />
              <span className="dark-ui-muted font-mono text-[10px]">{card.title}</span>
            </div>
            <div className="space-y-0.5">
              {card.code.map((line) => (
                <p
                  key={line}
                  className="dark-ui-muted font-mono text-[9px] leading-relaxed lg:text-[10px]"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
