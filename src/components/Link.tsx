import React from "react";
import { navigate } from "../lib/routes";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  onNavigate?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  to,
  className,
  children,
  onNavigate,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // If already defaultPrevented, do nothing
    if (e.defaultPrevented) return;

    // Check for modifier keys or non-left-click
    if (
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      e.button === 0
    ) {
      e.preventDefault();
      
      // Perform programmatic navigation
      navigate(to);

      if (onNavigate) {
        onNavigate();
      }
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default Link;
