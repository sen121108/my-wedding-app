import React from "react";
import PropTypes from "prop-types";

export default function Card({ children, className = "", pattern = null, variant = null, ...rest }) {
  const base = [
    "w-full max-w-full md:max-w-[min(100%,_48rem)]",
    "relative overflow-hidden",
    "rounded-lg md:rounded-xl",
    "px-3 py-8 md:px-10 md:py-14",
    "flex items-center justify-center",
  ];

  const variantClasses = variant === "paper" ? [
    "bg-[var(--brand-cream)]",
    "shadow-md md:shadow-lg",
    "border",
    "border-[rgba(0,0,0,0.06)]",
    "ring-1 ring-[var(--brand-gold)/20]",
  ] : [
    "bg-[#faf9f5] shadow-md md:shadow-lg",
    "border border-neutral-300/60",
  ];

  return (
    <div className={`w-full flex justify-center ${className}`} {...rest}>
      <div className={[...base, ...variantClasses].join(" ")}>
        {pattern && (
          <div
            className={`absolute inset-0 bg-center bg-cover opacity-[0.20] pointer-events-none`}
            style={{ backgroundImage: `url('${pattern}')` }}
          />
        )}

        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pattern: PropTypes.string,
};
