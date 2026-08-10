import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105',
    outline:
      'border border-blue-200 text-blue-700 bg-white hover:bg-blue-50/80 hover:border-blue-400 shadow-sm',
    darkOutline:
      'border border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white shadow-lg',
    ghost:
      'text-slate-700 hover:text-blue-600 hover:bg-blue-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
