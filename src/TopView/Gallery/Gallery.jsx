// src/Profile/Gallery/Gallery.jsx
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { GALLERY_IMAGES } from "./galleryData";

export default function Gallery({
  images = GALLERY_IMAGES,
  autoPlayDelayMs = 3200,
  loop = true,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, dragFree: false, align: "center", skipSnaps: false },
    [
      Autoplay({
        delay: autoPlayDelayMs,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative rounded-2xl bg-[#faf7f3] p-5 md:p-8">
      {/* 台紙の罫線 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-3 right-3 top-14 h-px bg-gray-300/70" />
        <div className="absolute left-3 right-3 bottom-14 h-px bg-gray-300/70" />
        <div className="absolute top-5 bottom-5 left-6 w-px bg-gray-300/70" />
        <div className="absolute top-5 bottom-5 right-6 w-px bg-gray-300/70" />
      </div>

      {/* ラベルは viewport 外に置いて絶対配置（スワイプを阻害しない） */}
      <div
        className="pointer-events-none absolute left-1.5 top-1.5 z-20
                   rounded px-2 py-1 bg-white/55
                   text-[15px] md:text-[18px] tracking-[0.35em]
                   font-['Cormorant_Garamond',serif]
                   [writing-mode:vertical-rl] select-none"
      >
        PHOTO
      </div>
      <div
        className="pointer-events-none absolute right-1.5 bottom-1.5 z-20
                   rounded px-2 py-1 bg-white/55 
                   text-[15px] md:text-[18px] tracking-[0.35em]
                   font-['Cormorant_Garamond',serif]
                   [writing-mode:vertical-rl] select-none"
      >
        ALBUM
      </div>

      {/* Embla viewport（直下は“トラックのみ”にする） */}
      <div className="relative overflow-hidden -mx-3 sm:-mx-6" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((img, i) => (
            <div
              key={i}
              // 左右のぞき見：モバイル84% / md62%
              className="min-w-0 px-3 sm:px-6 flex-[0_0_84%] md:flex-[0_0_62%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${images.length}`}
            >
              <figure className="relative bg-white p-3 sm:p-4 border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                {/* フォトコーナー */}
                <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-t-2 border-l-2 border-amber-300/80"></span>
                <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-t-2 border-r-2 border-amber-300/80"></span>
                <span className="pointer-events-none absolute left-2 bottom-8 h-3 w-3 border-b-2 border-l-2 border-amber-300/80"></span>
                <span className="pointer-events-none absolute right-2 bottom-8 h-3 w-3 border-b-2 border-r-2 border-amber-300/80"></span>

                {/* 写真本体：aspect を 4/3 に戻す */}
                <div className="aspect-[4/3] bg-neutral-100">
                  <img
                    src={img.src}
                    alt={img.alt ?? `ギャラリー画像 ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* 台紙エンボス */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gray-950/[0.04]" />

                {/* キャプション */}
                {img.caption && (
                  <figcaption className="mt-2 sm:mt-3 px-1 text-center text-[13px] leading-relaxed text-gray-700">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* ドット */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`${i + 1}枚目に移動`}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === selectedIndex ? "bg-gray-900 w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
