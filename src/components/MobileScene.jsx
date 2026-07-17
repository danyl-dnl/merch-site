import { useEffect, useRef, useState } from "react";
import { products } from "../data/products";

const MODELS = [
  "/assets/model/model1.webp",
  "/assets/model/model2.webp",
  "/assets/model/model3.webp",
  "/assets/model/model4.webp",
  "/assets/model/model5.webp",
  "/assets/model/model6.webp",
];

// ─── Glass Card (mobile version, flat + elegant) ──────────────────────────────
function MobileCard({ product, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: "72vw",
        maxWidth: "300px",
        aspectRatio: "3/4",
        borderRadius: "24px",
        scrollSnapAlign: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s cubic-bezier(0.2,0.8,0.2,1)",
        transform: isActive ? "scale(1.04)" : "scale(0.88)",
        background: "linear-gradient(150deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 20%, rgba(15,17,20,0.55) 55%, rgba(6,7,9,0.85) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: isActive
          ? "0 0 0 1px rgba(111,184,255,0.6), 0 24px 60px -10px rgba(0,0,0,0.8), 0 0 40px rgba(111,184,255,0.12)"
          : "0 0 0 1px rgba(255,255,255,0.08), 0 12px 30px -8px rgba(0,0,0,0.6)",
      }}
    >
      {/* Border gradient mask */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "24px", padding: "1.2px",
        background: isActive
          ? "linear-gradient(180deg, rgba(111,184,255,0.8) 0%, rgba(111,184,255,0.2) 50%, rgba(50,54,62,0.3) 100%)"
          : "linear-gradient(180deg, rgba(235,240,248,0.6) 0%, rgba(120,128,142,0.1) 50%, rgba(50,54,62,0.3) 100%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
        transition: "background 0.4s ease",
      }} />

      {/* Diagonal sheen */}
      <div style={{
        position: "absolute", top: "-20%", left: "-10%", width: "65%", height: "50%",
        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12), transparent 70%)",
        transform: "rotate(-16deg)", pointerEvents: "none",
      }} />

      {/* Product image */}
      <div style={{
        position: "absolute", inset: "8% 6% 22%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "contain",
            filter: "drop-shadow(0 12px 16px rgba(0,0,0,0.7))",
            transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1)",
            transform: isActive ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      {/* Bottom label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "12px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
      }}>
        <span style={{
          fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.2em", color: "#eef1f5",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
        }}>
          {product.name}
        </span>
        <span style={{ color: "#6fb8ff", fontSize: "14px" }}>↗</span>
      </div>
    </div>
  );
}

// ─── Main Mobile Scene ────────────────────────────────────────────────────────
export default function MobileScene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const isScrolling = useRef(false);

  // Use IntersectionObserver to detect which card is centered
  useEffect(() => {
    const observers = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
              setActiveIndex(i);
            }
          });
        },
        {
          root: scrollRef.current,
          threshold: 0.6,
        }
      );
      obs.observe(card);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div style={{
      width: "100vw",
      height: "100dvh",
      background: "linear-gradient(180deg, #05070a 0%, #070a10 40%, #040509 100%)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>

      {/* ── Background ambient glows ─────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 40% at 50% 20%, rgba(30,50,90,0.4), transparent 70%),
          radial-gradient(ellipse 60% 50% at 50% 100%, rgba(15,25,50,0.5), transparent 70%)
        `
      }} />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "env(safe-area-inset-top, 16px) 20px 0",
        paddingTop: "max(env(safe-area-inset-top, 16px), 16px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "22px",
          letterSpacing: "0.12em",
          color: "#eef1f5",
          lineHeight: 1,
        }}>
          EXCEL<span style={{ color: "#6fb8ff" }}> MERCH</span>
        </div>
        <div style={{
          fontSize: "10px", letterSpacing: "0.2em",
          color: "rgba(111,184,255,0.6)",
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase",
          fontWeight: 600,
        }}>
          {activeIndex + 1} / {products.length}
        </div>
      </div>

      {/* ── Mannequin Model Area ──────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 5,
        flex: "0 0 42%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Glowing ring beneath model */}
        <div style={{
          position: "absolute",
          bottom: "-8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "30px",
          borderRadius: "50%",
          border: "1px solid rgba(111,184,255,0.5)",
          boxShadow: "0 0 30px rgba(111,184,255,0.3), 0 0 80px rgba(111,184,255,0.2), inset 0 0 20px rgba(111,184,255,0.1)",
          pointerEvents: "none",
        }} />

        {/* EXCEL wordmark watermark */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          pointerEvents: "none",
        }}>
          <img
            src="/assets/excelmerch.webp"
            alt=""
            style={{
              width: "130%",
              opacity: 0.12,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Base mannequin */}
        <img
          src="/assets/mannequin-hoodie.webp"
          alt="Model"
          style={{
            position: "absolute",
            height: "105%",
            width: "auto",
            objectFit: "contain",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: activeIndex === null ? 1 : 0,
            transition: "opacity 0.5s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />

        {/* Hover model images — crossfade on card change */}
        {MODELS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              position: "absolute",
              height: "105%",
              width: "auto",
              objectFit: "contain",
              bottom: 0,
              left: "50%",
              transform: `translateX(-50%) ${activeIndex === i ? "scale(1)" : "scale(0.97)"}`,
              opacity: activeIndex === i ? 1 : 0,
              transition: "opacity 0.5s cubic-bezier(0.2,0.8,0.2,1), transform 0.5s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          />
        ))}

        {/* Active product name badge */}
        <div style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(111,184,255,0.12)",
          border: "1px solid rgba(111,184,255,0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "5px 14px",
          whiteSpace: "nowrap",
          transition: "opacity 0.3s",
          zIndex: 2,
        }}>
          <span style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6fb8ff",
            fontFamily: "'Inter', sans-serif",
          }}>
            {products[activeIndex]?.name}
          </span>
        </div>
      </div>

      {/* ── Scroll hint text ─────────────────────────────────────────────── */}
      <div style={{
        textAlign: "center",
        fontSize: "9px",
        letterSpacing: "0.2em",
        color: "rgba(111,184,255,0.35)",
        fontFamily: "'Inter', sans-serif",
        textTransform: "uppercase",
        padding: "8px 0 4px",
        position: "relative", zIndex: 10,
      }}>
        Swipe to explore
      </div>

      {/* ── Horizontal Card Scroll Carousel ─────────────────────────────── */}
      <div
        ref={scrollRef}
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "calc(50vw - 36vw)",
          paddingRight: "calc(50vw - 36vw)",
          paddingTop: "12px",
          paddingBottom: "16px",
          // Hide scrollbar
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          position: "relative", zIndex: 10,
        }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ scrollSnapAlign: "center", flexShrink: 0 }}
          >
            <MobileCard
              product={product}
              isActive={activeIndex === i}
              onClick={() => {
                setActiveIndex(i);
                scrollTo(i);
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Dot Indicators ───────────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        alignItems: "center",
        paddingBottom: "max(env(safe-area-inset-bottom, 16px), 16px)",
        position: "relative", zIndex: 10,
        flex: 1,
        alignSelf: "flex-end",
        width: "100%",
      }}>
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              scrollTo(i);
            }}
            style={{
              width: activeIndex === i ? "24px" : "7px",
              height: "7px",
              borderRadius: "4px",
              border: "none",
              outline: "none",
              background: activeIndex === i ? "rgba(111,184,255,0.9)" : "rgba(111,184,255,0.2)",
              boxShadow: activeIndex === i ? "0 0 10px rgba(111,184,255,0.6)" : "none",
              transition: "all 0.35s cubic-bezier(0.2,0.8,0.2,1)",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

    </div>
  );
}
