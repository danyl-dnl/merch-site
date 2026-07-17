import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "../data/products";

const MODELS = [
  "/assets/model/model1.webp",
  "/assets/model/model2.webp",
  "/assets/model/model3.webp",
  "/assets/model/model4.webp",
  "/assets/model/model5.webp",
  "/assets/model/model6.webp",
];

// Subtle per-product accent for ambient glow
const ACCENTS = [
  "rgba(111,184,255,0.18)",
  "rgba(160,120,255,0.18)",
  "rgba(80,220,200,0.18)",
  "rgba(100,160,255,0.18)",
  "rgba(255,120,160,0.18)",
  "rgba(80,200,180,0.18)",
];

const ACCENT_SOLID = [
  "#6fb8ff",
  "#a078ff",
  "#50dcc8",
  "#64a0ff",
  "#ff78a0",
  "#50c8b4",
];

// ─── Card Component ───────────────────────────────────────────────────────────
function Card({ product, isActive, accentColor, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: "68vw",
        maxWidth: "290px",
        aspectRatio: "3/4",
        borderRadius: "28px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        userSelect: "none",
        transition:
          "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: isActive ? "scale(1)" : "scale(0.86)",
        opacity: isActive ? 1 : 0.5,
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 25%, rgba(12,14,18,0.6) 60%, rgba(4,5,8,0.88) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: isActive
          ? `0 0 0 1.5px ${accentColor}99, 0 28px 64px -10px rgba(0,0,0,0.85), 0 0 60px ${accentColor}22`
          : "0 0 0 1px rgba(255,255,255,0.06), 0 10px 28px -6px rgba(0,0,0,0.7)",
        willChange: "transform, opacity",
      }}
    >
      {/* Gradient border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "28px",
          padding: "1.5px",
          background: isActive
            ? `linear-gradient(160deg, ${accentColor}dd 0%, ${accentColor}44 40%, rgba(50,54,62,0.2) 100%)`
            : "linear-gradient(160deg, rgba(235,240,248,0.3) 0%, rgba(100,108,122,0.08) 50%, rgba(30,34,42,0.2) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          transition: "background 0.5s ease",
        }}
      />

      {/* Top-left specular sheen */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "60%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.13), transparent 70%)",
          transform: "rotate(-18deg)",
          pointerEvents: "none",
        }}
      />

      {/* Category tag */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          padding: "4px 10px",
          borderRadius: "20px",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${accentColor}44`,
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accentColor,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Product image */}
      <div
        style={{
          position: "absolute",
          inset: "14% 6% 22%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.8))",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            transform: isActive ? "scale(1.05) translateY(-4px)" : "scale(1)",
          }}
        />
      </div>

      {/* Bottom info bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 16px 16px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#eef1f5",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {product.name}
        </span>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: accentColor, fontSize: "13px", lineHeight: 1 }}>↗</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Mobile Scene ────────────────────────────────────────────────────────
export default function MobileScene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  const accentColor = ACCENT_SOLID[activeIndex] || ACCENT_SOLID[0];
  const accentGlow = ACCENTS[activeIndex] || ACCENTS[0];

  // ── Derive active index from scroll position (accurate & reliable) ──
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      const center = container.scrollLeft + container.clientWidth / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      setActiveIndex(closestIdx);
      if (!hasInteracted) setHasInteracted(true);
    });
  }, [hasInteracted]);

  // ── Scroll to a specific card index ──
  const scrollToIndex = (i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  // ── Keyboard support ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight")
        scrollToIndex(Math.min(activeIndex + 1, products.length - 1));
      if (e.key === "ArrowLeft") scrollToIndex(Math.max(activeIndex - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: "#050709",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Animated ambient background ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 1s ease",
          background: `
            radial-gradient(ellipse 90% 45% at 50% 0%, ${accentGlow}, transparent 70%),
            radial-gradient(ellipse 70% 40% at 50% 100%, rgba(10,14,24,0.8), transparent 70%),
            linear-gradient(180deg, #05070a 0%, #07090f 50%, #040507 100%)
          `,
        }}
      />

      {/* ── Header ────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          zIndex: 20,
          paddingTop: "max(env(safe-area-inset-top, 0px) + 14px, 20px)",
          paddingBottom: "8px",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "24px",
              letterSpacing: "0.14em",
              color: "#f0f4f8",
              lineHeight: 1,
            }}
          >
            EXCEL<span style={{ color: accentColor, transition: "color 0.6s ease" }}> MERCH</span>
          </div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              color: "rgba(160,174,196,0.45)",
              fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            2026 Techfest
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "rgba(160,174,196,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: accentColor, transition: "color 0.6s ease" }}>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span> / {String(products.length).padStart(2, "0")}</span>
        </div>
      </header>

      {/* ── Model Stage ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: "0 0 44%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Faint wordmark watermark */}
        <img
          src="/assets/excelmerch.webp"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "150%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.07,
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Glowing floor ellipse */}
        <div
          style={{
            position: "absolute",
            bottom: "-6%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "28px",
            borderRadius: "50%",
            border: `1px solid ${accentColor}88`,
            boxShadow: `0 0 28px ${accentColor}55, 0 0 70px ${accentColor}33`,
            transition: "border-color 0.8s ease, box-shadow 0.8s ease",
            pointerEvents: "none",
          }}
        />

        {/* Base mannequin */}
        <img
          src="/assets/mannequin-hoodie.webp"
          alt="Model"
          style={{
            position: "absolute",
            height: "110%",
            width: "auto",
            objectFit: "contain",
            bottom: "-2%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Per-product crossfade model images */}
        {MODELS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              height: "110%",
              width: "auto",
              objectFit: "contain",
              bottom: "-2%",
              left: "50%",
              transform: `translateX(-50%) scale(${activeIndex === i ? 1 : 0.97})`,
              opacity: activeIndex === i ? 1 : 0,
              transition:
                "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              willChange: "opacity, transform",
            }}
          />
        ))}

        {/* Active product pill */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}44`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "40px",
            padding: "6px 18px",
            zIndex: 10,
            transition: "background 0.6s ease, border-color 0.6s ease",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: accentColor,
              fontFamily: "'Inter', sans-serif",
              transition: "color 0.6s ease",
            }}
          >
            {products[activeIndex]?.name}
          </span>
        </div>
      </div>

      {/* ── Swipe hint ─────────────────────────────────────────────────── */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "6px",
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
          opacity: hasInteracted ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ fontSize: "14px", animation: "swipeHint 1.4s ease-in-out infinite" }}>←</span>
          <span
            style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(160,174,196,0.5)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Swipe to explore
          </span>
          <span style={{ fontSize: "14px", animation: "swipeHint 1.4s ease-in-out infinite reverse" }}>→</span>
        </div>
      </div>

      {/* ── Scroll Snap Carousel ─────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "calc(50vw - 34vw)",
          paddingRight: "calc(50vw - 34vw)",
          paddingTop: "8px",
          paddingBottom: "12px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
          cursor: "grab",
        }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ scrollSnapAlign: "center", flexShrink: 0 }}
          >
            <Card
              product={product}
              isActive={activeIndex === i}
              accentColor={ACCENT_SOLID[i]}
              onClick={() => scrollToIndex(i)}
            />
          </div>
        ))}
      </div>

      {/* ── Footer: dots + CTA ────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          paddingBottom: "max(env(safe-area-inset-bottom, 0px) + 12px, 20px)",
          flexShrink: 0,
        }}
      >
        {/* Pill dots */}
        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to product ${i + 1}`}
              style={{
                width: activeIndex === i ? "22px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                outline: "none",
                background:
                  activeIndex === i
                    ? ACCENT_SOLID[i]
                    : "rgba(255,255,255,0.18)",
                boxShadow:
                  activeIndex === i
                    ? `0 0 8px ${ACCENT_SOLID[i]}88`
                    : "none",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          style={{
            padding: "12px 32px",
            borderRadius: "40px",
            background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor}88)`,
            border: `1px solid ${accentColor}55`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: `0 0 24px ${accentColor}33, 0 4px 16px rgba(0,0,0,0.4)`,
            cursor: "pointer",
            transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            outline: "none",
          }}
          onPointerDown={(e) => {
            e.currentTarget.style.transform = "scale(0.96)";
          }}
          onPointerUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            Shop Now
          </span>
        </button>
      </div>

      {/* ── Inline animation keyframes ─────────────────────────────────── */}
      <style>{`
        @keyframes swipeHint {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
