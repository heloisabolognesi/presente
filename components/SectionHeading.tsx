"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-2xl mx-auto text-center mb-16"
    >
      {eyebrow && (
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-teamgreen/50" />
          <p className="font-mono text-[11px] tracking-[0.3em] text-mutedgray uppercase">
            {eyebrow}
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-teampurple/50" />
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-gradient">
        {title}
      </h2>
      {subtitle && (
        <p className="text-mutedgray font-body mt-4 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-px w-12 mx-auto bg-gradient-to-r from-teamgreen/40 via-teampurple/30 to-teamgreen/40" />
    </motion.div>
  );
}
