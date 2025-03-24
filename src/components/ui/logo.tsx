
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  
  const colorClasses = {
    default: 'text-scorpion',
    white: 'text-white',
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} ${colorClasses[variant]} ${className}`}>
      <span className="flex items-center">
        <svg 
          width={size === 'sm' ? "24" : size === 'md' ? "32" : "40"} 
          height={size === 'sm' ? "24" : size === 'md' ? "32" : "40"} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path 
            d="M19.5,5.5h-15V19L8,17.5l3.5,1.5l3.5-1.5l4.5,1.5V5.5z" 
            fill={variant === 'default' ? '#1a51b0' : '#ffffff'} 
            stroke={variant === 'default' ? '#1a51b0' : '#ffffff'} 
            strokeWidth="1.5"
          />
          <path 
            d="M12,8v6M9,10l6,2M9,14l6-2" 
            stroke={variant === 'default' ? '#ffffff' : '#1a51b0'} 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        </svg>
        Scorpion<span className="font-light">Tests</span>
      </span>
    </div>
  );
};

export default Logo;
