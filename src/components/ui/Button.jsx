import React from "react";
import PropTypes from "prop-types";

export default function Button({ children, className = "", ...rest }) {
  return (
    <button className={`inline-flex items-center gap-2 ${className}`} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
