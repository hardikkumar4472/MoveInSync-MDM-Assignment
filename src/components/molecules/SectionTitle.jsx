import { motion } from "framer-motion";
import Typography from "../atoms/Typography";
export default function SectionTitle({ children, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-10"
    >
      <div className="w-1.5 h-6 bg-ms-green rounded-full" />
      <Typography variant="overline">{children}</Typography>
    </motion.div>
  );
}
