import { useEffect, useState, useRef } from "react";
import { products } from "../data/products";
import Character3D from "./Character3D";

// ─── Final Hardcoded Carousel Layout ─────────────────────────────────────────
const CAROUSEL_SLOTS = [
  { left: 571, top: 612, width: 220, height: 280, scale: 100, tilt: 1, turn: 18, pitch: -11 },
  { left: 328, top: 693, width: 288, height: 313, scale: 100, tilt: 0, turn: -33, pitch: -14 },
  { left: 735, top: 758, width: 267, height: 334, scale: 100, tilt: 1, turn: -6, pitch: 0 },
  { left: 1124, top: 760, width: 267, height: 315, scale: 100, tilt: 0, turn: 4, pitch: -1 },
  { left: 1533, top: 705, width: 314, height: 308, scale: 100, tilt: 0, turn: 44, pitch: -14 },
  { left: 1279, top: 598, width: 230, height: 289, scale: 100, tilt: 0, turn: -13, pitch: -6 }
];

// ─── Product Card Component ─────────────────────────────────────────────────
function ProductCard({ product, slot, isFront, onHover, onLeave }) {
  const blue = "#6fb8ff";
  const silverHi = "rgba(235,240,248,0.95)";
  const silverLo = "rgba(50,54,62,0.5)";
  const fontSize = Math.max(9, Math.round(slot.width * 0.05));
  
  return (
    <div
      style={{
        position: "absolute",
        left: `${slot.left}px`,
        top: `${slot.top}px`,
        width: `${slot.width}px`,
        height: `${slot.height}px`,
        transform: `translate(-50%, -50%) perspective(1400px) rotateX(${slot.pitch}deg) rotateY(${slot.turn}deg) rotateZ(${slot.tilt}deg)`,
        zIndex: isFront ? 15 : 10,
        pointerEvents: "auto",
        cursor: "pointer",
        // Smoothly animate all layout properties between slots!
        transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), z-index 0s",
      }}
      onMouseEnter={(e) => {
        onHover();
        // Bring to front and add a premium lift effect on hover
        e.currentTarget.style.zIndex = "30";
        e.currentTarget.style.transform = `translate(-50%, -50%) perspective(1400px) rotateX(${slot.pitch}deg) rotateY(${slot.turn}deg) rotateZ(${slot.tilt}deg) translateY(-8px) scale(1.04)`;
      }}
      onMouseLeave={(e) => {
        onLeave();
        // Return to original 3D position
        e.currentTarget.style.zIndex = isFront ? "15" : "10";
        e.currentTarget.style.transform = `translate(-50%, -50%) perspective(1400px) rotateX(${slot.pitch}deg) rotateY(${slot.turn}deg) rotateZ(${slot.tilt}deg)`;
      }}
    >
      {/* ─── Main Card Body ─── */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "20px",
        background: "linear-gradient(150deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 20%, rgba(15,17,20,0.55) 55%, rgba(6,7,9,0.8) 100%)",
        backdropFilter: "blur(5px) saturate(120%)",
        WebkitBackdropFilter: "blur(5px) saturate(120%)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -10px 18px rgba(0,0,0,0.5), 0 20px 40px -14px rgba(0,0,0,0.75)",
        overflow: "hidden",
      }}>
        
        {/* Gradient Border Mask */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "20px", padding: "1.3px",
          background: `linear-gradient(180deg, ${silverHi} 0%, rgba(190,198,212,0.4) 20%, rgba(120,128,142,0.14) 50%, rgba(70,76,88,0.3) 78%, ${silverLo} 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }} />

        {/* Diagonal Sheen */}
        <div style={{
          position: "absolute", top: "-25%", left: "-15%", width: "70%", height: "55%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.16), transparent 70%)",
          transform: "rotate(-16deg)",
          pointerEvents: "none",
        }} />

        {/* Product Inner Container */}
        <div style={{
          position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "10% 4% 18%", 
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%", height: "100%", objectFit: "contain",
              filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.6))",
            }}
          />
        </div>

        {/* Bottom Label Area */}
        <div style={{
          position: "absolute", left: "8%", bottom: "6%", display: "flex", alignItems: "center", gap: "6px", zIndex: 3
        }}>
          <span style={{
            fontSize: `${fontSize}px`, letterSpacing: "0.16em", color: "#eef1f5", fontWeight: 700, textTransform: "uppercase"
          }}>
            {product.name}
          </span>
          <span style={{
            color: blue, fontSize: `${fontSize + 2}px`
          }}>
            ↗
          </span>
        </div>
      </div>

      {/* ─── Floor Reflection ─── */}
      <div style={{
        position: "absolute", left: 0, top: "100%", width: "100%", height: "60%",
        transform: "scaleY(-1)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 75%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 75%)",
        opacity: 0.14,
        borderRadius: "20px",
        overflow: "hidden",
        zIndex: 1,
        pointerEvents: "none",
      }}>
        <div style={{
          height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-end", 
          padding: "18% 4% 10%", 
        }}>
          <img src={product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Scene ─────────────────────────────────────────────────────────────
export default function Scene() {
  const [scale, setScale] = useState(1);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Drag interaction refs
  const dragStart = useRef(null);
  const offsetAtStart = useRef(0);
  const lastWheelTime = useRef(0);

  // Interactive Handlers
  const handleWheel = (e) => {
    const now = Date.now();
    // Increase cooldown to 800ms to absorb Apple trackpad momentum scrolling
    if (now - lastWheelTime.current < 800) return; 
    
    // Ignore micro-movements (like resting fingers on trackpad)
    if (Math.abs(e.deltaY) < 15 && Math.abs(e.deltaX) < 15) return;

    lastWheelTime.current = now;
    
    if (e.deltaY > 0 || e.deltaX > 0) {
      setCarouselOffset(prev => prev + 1);
    } else {
      setCarouselOffset(prev => prev - 1);
    }
  };

  const handlePointerDown = (e) => {
    // Don't initiate drag if the user is clicking a button (arrows, dots)
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;
    dragStart.current = e.clientX;
    offsetAtStart.current = carouselOffset;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  
  const handlePointerMove = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    
    // Every 150px dragged horizontally equals 1 slot rotation
    const slotsToMove = Math.round(dx / 150);
    if (offsetAtStart.current - slotsToMove !== carouselOffset) {
       setCarouselOffset(offsetAtStart.current - slotsToMove);
    }
  };
  
  const handlePointerUp = (e) => {
    dragStart.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // 1. Mannequin (Locked)
  const mannequinStyle = {
    position: "absolute",
    zIndex: 12,
    left: "934px",
    top: "641px",
    width: "1406px",
    height: "934px",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  };

  // 2. EXCEL Merch Typography (Locked)
  const wordmarkStyle = {
    position: "absolute",
    zIndex: 6,
    left: "981px",
    top: "372px",
    width: "1848px",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  };

  // 3. Floor Ellipse Ring (Locked)
  const ringStyle = {
    position: "absolute",
    zIndex: 5,
    left: "942px",
    top: "820px",
    width: "1708px",
    height: "277px",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  };

  useEffect(() => {
    const handleResize = () => {
      setScale(Math.max(window.innerWidth / 1920, window.innerHeight / 1080));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#040610", position: "relative", cursor: "grab" }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Main 1920x1080 Scaled Canvas */}
      <div style={{
        position: "absolute", width: "1920px", height: "1080px",
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none", // Let pointer events pass through to the wrapper for dragging
      }}>

        {/* Floor Ellipse Ring */}
        <div style={ringStyle}>
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(111,184,255,0.6)",
            boxShadow: "0 0 40px rgba(111,184,255,0.35), inset 0 0 30px rgba(111,184,255,0.2), 0 0 120px rgba(111,184,255,0.45), 0 0 15px rgba(111,184,255,0.8)",
          }} />
        </div>

        {/* Mannequin 3D Model */}
        <div style={mannequinStyle}>
          <Character3D height="100%" activeIndex={hoveredIndex} />
        </div>

        {/* Background EXCEL / Merch Typography */}
        <div style={wordmarkStyle}>
          <img
            src="/assets/excelmerch.webp"
            alt="Excel Merch"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Products Carousel */}
        {products.map((product, i) => {
          const slotIndex = ((i + carouselOffset) % 6 + 6) % 6;
          const isFront = (slotIndex === 2 || slotIndex === 3);
          return (
            <ProductCard
              key={product.id}
              product={product}
              slot={CAROUSEL_SLOTS[slotIndex]}
              isFront={isFront}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          );
        })}

        {/* ── Left Arrow ─────────────────────────────────────────── */}
        <button
          onClick={() => setCarouselOffset(p => p - 1)}
          style={{
            position: "absolute",
            left: "32px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "1px solid rgba(111,184,255,0.35)",
            background: "rgba(10,14,22,0.55)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "0 0 18px rgba(111,184,255,0.18), inset 0 1px 1px rgba(255,255,255,0.1)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
            outline: "none",
            pointerEvents: "auto",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.border = "1px solid rgba(111,184,255,0.75)";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(111,184,255,0.45), inset 0 1px 1px rgba(255,255,255,0.18)";
            e.currentTarget.style.background = "rgba(20,35,60,0.75)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.border = "1px solid rgba(111,184,255,0.35)";
            e.currentTarget.style.boxShadow = "0 0 18px rgba(111,184,255,0.18), inset 0 1px 1px rgba(255,255,255,0.1)";
            e.currentTarget.style.background = "rgba(10,14,22,0.55)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="rgba(111,184,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Right Arrow ─────────────────────────────────────────── */}
        <button
          onClick={() => setCarouselOffset(p => p + 1)}
          style={{
            position: "absolute",
            right: "32px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "1px solid rgba(111,184,255,0.35)",
            background: "rgba(10,14,22,0.55)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "0 0 18px rgba(111,184,255,0.18), inset 0 1px 1px rgba(255,255,255,0.1)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
            outline: "none",
            pointerEvents: "auto",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.border = "1px solid rgba(111,184,255,0.75)";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(111,184,255,0.45), inset 0 1px 1px rgba(255,255,255,0.18)";
            e.currentTarget.style.background = "rgba(20,35,60,0.75)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.border = "1px solid rgba(111,184,255,0.35)";
            e.currentTarget.style.boxShadow = "0 0 18px rgba(111,184,255,0.18), inset 0 1px 1px rgba(255,255,255,0.1)";
            e.currentTarget.style.background = "rgba(10,14,22,0.55)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="rgba(111,184,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Dot Indicators ───────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          gap: "10px",
          alignItems: "center",
          pointerEvents: "auto",
        }}>
          {products.map((_, i) => {
            // Dot is "active" when it is in the front center slot (slot index 2 or 3)
            const slotIndex = ((i + carouselOffset) % 6 + 6) % 6;
            const isActive = slotIndex === 2 || slotIndex === 3;
            return (
              <button
                key={i}
                onClick={() => {
                  // Rotate so that this product ends up in the front slot
                  const targetSlot = 2;
                  const currentSlot = ((i + carouselOffset) % 6 + 6) % 6;
                  const diff = targetSlot - currentSlot;
                  setCarouselOffset(p => p + diff);
                }}
                style={{
                  width: isActive ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  background: isActive
                    ? "rgba(111,184,255,0.9)"
                    : "rgba(111,184,255,0.25)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(111,184,255,0.7)"
                    : "none",
                  transition: "all 0.35s cubic-bezier(0.2,0.8,0.2,1)",
                  padding: 0,
                }}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}
