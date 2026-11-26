import { motion } from "framer-motion";

export default function PinkButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}) {
  const base =
    "font-display inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base sm:text-lg font-semibold tracking-wide transition-colors select-none";

  const variants = {
    primary:
      "bg-blush-500 text-white shadow-[0_6px_0_0_var(--color-blush-700)] hover:bg-blush-600 active:shadow-[0_2px_0_0_var(--color-blush-700)]",
    secondary:
      "bg-white text-blush-700 border-2 border-blush-300 shadow-[0_4px_0_0_var(--color-blush-200)] hover:bg-blush-50",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ y: 2, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
