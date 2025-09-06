import useIntersectionFadeIn from "./hooks/useIntersectionFadeIn";

/**
 * props:
 *  title: string
 *  photo: string
 *  bio: string
 *  links: [{label, href}]
 */
export default function PersonCard({ title, photo, bio, links = [] }) {
  const { ref, className } = useIntersectionFadeIn();
  return (
    <section
      ref={ref}
      className={`rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-5 flex gap-4 md:gap-6 shadow-sm ${className}`}
    >
      <img className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl" src={photo} alt={title} />
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-gray-600 leading-7 mt-1 whitespace-pre-wrap">{bio}</p>
        {links?.length > 0 && (
          <ul className="flex gap-4 mt-3 text-blue-600 underline">
            {links.map(({ label, href }) => (
              <li key={href}><a href={href} target="_blank" rel="noreferrer">{label}</a></li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
