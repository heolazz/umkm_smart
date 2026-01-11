import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    // Primary: Nusantara Blue (PMS 2132 C)
    primary: "bg-[#0857C3] text-white hover:bg-[#0645a0] focus:ring-[#0857C3] shadow-lg shadow-[#0857C3]/25 border border-transparent",
    // Secondary: Neutral/Light with Mentari Blue border
    secondary: "bg-white text-[#0857C3] hover:bg-[#F5FAFF] focus:ring-[#71C5E8] border border-[#71C5E8]",
    // Accent: Cakrawala Blue (PMS 2727 C)
    accent: "bg-[#307FE2] text-white hover:bg-[#2565b8] focus:ring-[#307FE2] shadow-lg shadow-[#307FE2]/25 border border-transparent",
    // Outline: Nusantara Blue Border
    outline: "border border-[#0857C3]/30 bg-transparent text-[#0857C3] hover:bg-[#0857C3] hover:text-white focus:ring-[#0857C3] shadow-sm",
    // Danger: Standard Red
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 focus:ring-red-500",
    // Ghost: Transparent with Nusantara Text
    ghost: "bg-transparent text-[#0857C3]/70 hover:bg-[#F5FAFF] hover:text-[#0857C3]",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};