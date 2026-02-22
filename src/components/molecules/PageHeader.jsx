import { motion } from "framer-motion";
import Typography from "../atoms/Typography";
export default function PageHeader({ title, subtitle, description }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <Typography variant="h1" as="h2">
          {title} <br/>
          <span className="text-ms-green not-italic bg-clip-text text-transparent bg-gradient-to-r from-ms-green to-emerald-500 text-xl md:text-2xl lg:text-3xl block mt-2 md:mt-4 py-2 leading-relaxed tracking-normal">
            {subtitle}
          </span>
        </Typography>
        {description && (
          <Typography variant="body" className="max-w-2xl">
            {description}
          </Typography>
        )}
      </div>
    </motion.div>
  );
}
