import { useState } from "react";
import useIntersectionFadeIn from "./hooks/useIntersectionFadeIn";

/**
 * props: images: string[]
 */
export default function Gallery({ images = [] }) {
  const [active, setActive] = useState(null);
  const { ref, className } = useIntersectionFadeIn();
  return (
    <section ref={ref} className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => (
          <button key={i} onClick={() => setActive(src)} className="group relative overflow-hidden rounded-2xl">
            <img src={src} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5"></div>
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <img src={active} alt="" className="max-h-[85vh] max-w-[92vw] rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}
