import { useEffect, useRef, useState } from "react";

export default function useIntersectionFadeIn(
  options = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
){
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.unobserve(el); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [options, visible]);

  const className = visible
    ? "opacity-100 translate-y-0 transition-all duration-700"
    : "opacity-0 translate-y-6";

  return { ref, className, visible };
}
