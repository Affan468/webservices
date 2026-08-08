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
      'bg-gradient-to-r from-sky-400 via-[#064699] to-blue-600 text-white font-bold border border-sky-300/40 shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 hover:from-sky-300 hover:to-[#064699] hover:scale-105',
    outline:
      'border border-sky-400/60 text-sky-200 bg-sky-500/15 hover:bg-sky-500/30 hover:border-sky-300 backdrop-blur-sm shadow-sm',
    ghost:
      'text-sky-200 hover:text-white hover:bg-sky-500/20',
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
