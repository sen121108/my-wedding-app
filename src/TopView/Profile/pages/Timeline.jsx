import useIntersectionFadeIn from "../components/hooks/useIntersectionFadeIn";

/**
 * props: items: [{year, title, desc?}]
 */
function Item({ year, title, desc }) {
  const { ref, className } = useIntersectionFadeIn();
  return (
    <li ref={ref} className={`relative pl-8 ${className}`}>
      <span className="absolute left-1 top-2 w-3 h-3 rounded-full bg-gray-900"></span>
      <div className="text-sm text-gray-500">{year}</div>
      <div className="text-lg font-medium">{title}</div>
      {desc && <div className="text-gray-600">{desc}</div>}
    </li>
  );
}

export default function Timeline({ items = [] }) {
  return (
    <ol className="relative border-s border-gray-200 space-y-6 md:space-y-8 ps-3">
      {items.map((it, i) => <Item key={`${it.year}-${i}`} {...it} />)}
    </ol>
  );
}
