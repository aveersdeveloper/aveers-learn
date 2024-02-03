import React, { ReactNode } from "react";
import "./GlassText.css";

interface GlassTextProps {
  children: ReactNode;
}

const GlassText: React.FC<GlassTextProps> = ({ children }) => {
  return (
    <div className="glass-text" data-text={children}>
      {children}
    </div>
  );
};

export default GlassText;
