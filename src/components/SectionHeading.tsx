import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-14 ${center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}
  >
    {label && (
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
        {label}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">
      {title}
    </h2>
    {description && (
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
