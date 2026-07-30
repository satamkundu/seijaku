"use client";

import { useEffect, useRef, useState } from "react";

type SplitProcessVideoStripProps = {
  videos?: Array<{ url?: string; poster?: string; alt?: string }>;
};

function getInstagramEmbedUrl(url: string) {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/").filter(Boolean);
    const indicators = ["reel", "reels", "p", "tv"];
    for (const indicator of indicators) {
      const idx = parts.indexOf(indicator);
      if (idx !== -1 && parts[idx + 1]) {
        const type = indicator === "reels" ? "reel" : indicator;
        return `https://www.instagram.com/${type}/${parts[idx + 1]}/embed/`;
      }
    }
  } catch (e) {
    // fallback
  }
  return url;
}

export default function SplitProcessVideoStrip({ videos = [] }: SplitProcessVideoStripProps) {
  const isFourGrid = videos.length >= 4;
  const [reloadKeys, setReloadKeys] = useState<number[]>([0, 0, 0, 0]);
  const iframeRefs = useRef<Array<HTMLIFrameElement | null>>([]);
  
  // Local video state & refs
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // Detect when an iframe is clicked/played and reload other iframes to pause them
  useEffect(() => {
    if (!isFourGrid) return;

    let lastActiveElement: Element | null = null;

    const interval = setInterval(() => {
      if (document.activeElement !== lastActiveElement) {
        lastActiveElement = document.activeElement;

        if (document.activeElement && document.activeElement.tagName === "IFRAME") {
          const activeIframe = document.activeElement as HTMLIFrameElement;
          const clickedIndex = iframeRefs.current.findIndex((ref) => ref === activeIframe);

          if (clickedIndex !== -1) {
            // Pause any local video that might be playing
            videoRefs.current.forEach((v) => {
              if (v) v.pause();
            });
            setPlayingIdx(null);

            // Reload all OTHER iframes to pause them
            setReloadKeys((prev) => {
              const next = [...prev];
              let changed = false;
              for (let i = 0; i < next.length; i++) {
                if (i !== clickedIndex && next[i] === prev[i]) {
                  next[i] = prev[i] + 1; // Increment reload key to reload/pause
                  changed = true;
                }
              }
              return changed ? next : prev;
            });
          }
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isFourGrid]);

  const handleLocalPlayPause = (idx: number) => {
    const video = videoRefs.current[idx];
    if (!video) return;

    if (playingIdx === idx) {
      video.pause();
      setPlayingIdx(null);
    } else {
      // Pause all other local videos
      videoRefs.current.forEach((v, i) => {
        if (i !== idx && v) {
          v.pause();
        }
      });

      // Reload/reset all Instagram iframes to pause them
      setReloadKeys((prev) => prev.map((k) => k + 1));

      video.play().catch((err) => console.log("Video play failed:", err));
      setPlayingIdx(idx);
    }
  };

  if (isFourGrid) {
    return (
      <section aria-labelledby="process-strip-title" className="bg-[#ece5da] py-16 sm:py-20 lg:py-24">
        <div className="page-container max-w-[1100px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-[34rem] text-left mb-10 sm:mb-12">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#8b7f70] sm:text-[11px]">IN THE MAKING</p>
            <h2
              id="process-strip-title"
              className="mt-4 font-serif text-[clamp(30px,4vw,52px)] leading-[1.04] tracking-[-0.03em] text-[#1f1a15]"
            >
              Rituals take form
            </h2>
            <p className="mt-4 text-[15px] leading-[1.82] text-[#5d574e] sm:text-[16px]">
              Scent composed by hand. Clay finished in stillness.
            </p>
          </div>

          {/* 2x2 Grid on Mobile, 4-column row on Desktop */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {videos.slice(0, 4).map((video, index) => {
              const url = video?.url && video.url.length > 0 ? video.url : null;
              const poster = video?.poster && video.poster.length > 0 ? video.poster : null;
              const isInstagram =
                url &&
                (url.includes("instagram.com/reel/") ||
                  url.includes("instagram.com/reels/") ||
                  url.includes("instagram.com/p/") ||
                  url.includes("instagram.com/tv/"));

              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-[20px] border border-black/5 bg-[#faf8f4] shadow-sm aspect-[9/16] transition-transform duration-300 hover:scale-[1.01]"
                >
                  {isInstagram ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <iframe
                        key={`${index}-${reloadKeys[index]}`}
                        ref={(el) => {
                          iframeRefs.current[index] = el;
                        }}
                        src={getInstagramEmbedUrl(url)}
                        style={{
                          position: "absolute",
                          top: "-60px", // Crop top username bar
                          left: "-2px",
                          width: "calc(100% + 4px)",
                          height: "calc(100% + 220px)", // Crop bottom View on Instagram bar
                        }}
                        className="border-0"
                        allowFullScreen
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  ) : url ? (
                    <div className="absolute inset-0 overflow-hidden" onClick={() => handleLocalPlayPause(index)}>
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={url}
                        poster={poster ?? undefined}
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover cursor-pointer"
                        onPlay={() => setPlayingIdx(index)}
                        onPause={() => {
                          if (playingIdx === index) {
                            setPlayingIdx(null);
                          }
                        }}
                      />

                      {/* Play Button Overlay (shown when paused) */}
                      {playingIdx !== index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 cursor-pointer transition-opacity duration-300">
                          <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105">
                            <svg className="w-6 h-6 text-[#1d1a17] fill-current translate-x-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={poster}
                      alt={video?.alt ?? `Video loop ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                      <p className="font-serif text-[18px] text-[#2b241d]">In the Making</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#8b7f70] mt-2">Video {index + 1}</p>
                    </div>
                  )}

                  {/* Premium Brand Signature Pill at the bottom */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full py-1.5 px-3.5 flex items-center gap-2 shadow-md border border-black/5 whitespace-nowrap z-10 select-none pointer-events-none">
                    <span className="text-[10px] font-semibold text-[#1d1a17] tracking-[0.05em] font-sans">
                      seijaku
                    </span>
                    <div className="w-px h-3 bg-black/10" />
                    <span className="text-[9px] font-light text-[#8a8378] font-sans">
                      seijaku.co
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Original fallback for 2-column layout (if less than 4 videos are provided)
  const processPanels = [
    { title: "perfume blending in-house" },
    { title: "gold foiling terracotta in-house" },
  ];

  return (
    <section aria-labelledby="process-strip-title" className="bg-[#ece5da] py-6 sm:py-8 lg:py-10">
      <div className="relative min-h-[360px] overflow-hidden sm:min-h-[420px] lg:min-h-[520px]">
        <div className="grid min-h-[360px] grid-cols-1 gap-px bg-[#d8cec1] sm:min-h-[420px] sm:grid-cols-2 lg:min-h-[520px]">
          {processPanels.map((panel, index) => {
            const video = videos[index];
            const url = video?.url && video.url.length > 0 ? video.url : null;
            const poster = video?.poster && video.poster.length > 0 ? video.poster : null;
            const isInstagram =
              url &&
              (url.includes("instagram.com/reel/") ||
                url.includes("instagram.com/reels/") ||
                url.includes("instagram.com/p/") ||
                url.includes("instagram.com/tv/"));

            return (
              <div
                key={panel.title}
                className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#fffdf9] px-8 py-12 sm:min-h-[420px] sm:px-10 lg:min-h-[520px] lg:px-14"
              >
                {isInstagram ? (
                  <iframe
                    src={getInstagramEmbedUrl(url)}
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                ) : url ? (
                  <video
                    src={url}
                    poster={poster ?? undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={video?.alt ?? panel.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={poster}
                    alt={video?.alt ?? panel.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex max-w-[18ch] flex-col items-center gap-4 text-center">
                    <p className="font-serif text-[clamp(28px,3.4vw,48px)] leading-[1.14] tracking-[-0.03em] text-[#2b241d]">
                      {panel.title}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#8b7f70] sm:text-[12px]">Video loop</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center px-6 text-center sm:top-8 sm:px-10">
          <div className="max-w-[34rem] text-[#4f4943]">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#8b7f70] sm:text-[11px]">IN THE MAKING</p>
            <h2
              id="process-strip-title"
              className="mt-4 font-serif text-[clamp(30px,4vw,52px)] leading-[1.04] tracking-[-0.03em] text-[#1f1a15]"
            >
              Rituals take form
            </h2>
            <p className="mx-auto mt-4 max-w-[30ch] text-[15px] leading-[1.82] text-[#5d574e] sm:text-[16px]">
              Scent composed by hand. Clay finished in stillness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
