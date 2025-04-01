import React from 'react';

const HeroButton = ({ title, icon: Icon, targetId, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex h-12 animate-hero-btn items-center justify-center hero-btn transition-all scroll-smooth
      rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
      bg-[length:200%_100%] px-6 font-medium text-slate-400 focus:outline-none focus:ring-2 
      focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      {Icon && <Icon className="mr-2" />}
      {title}
    </button>
  );
};

export default HeroButton;
