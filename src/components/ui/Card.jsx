import React from "react";
import PropTypes from "prop-types";

export default function Card({ children, className = "", pattern = null, ...rest }) {
  return (
    <div className={`w-full flex justify-center ${className}`} {...rest}>
      <div
        className={[
          "w-full max-w-3xl",
          "relative overflow-hidden",
          "bg-[#faf9f5] shadow-md",
          "rounded-xl border border-neutral-300/60",
          "px-6 py-10 md:px-10 md:py-14",
          "flex items-center justify-center",
        ].join(" ")}
      >
        {pattern && (
          <div
            className={`absolute inset-0 bg-center bg-cover opacity-[0.20] pointer-events-none`}
            style={{ backgroundImage: `url('${pattern}')` }}
          />
        )}

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pattern: PropTypes.string,
};
