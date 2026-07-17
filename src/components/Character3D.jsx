export default function Character3D({ height = "100%", activeIndex = null }) {
  // Pre-define all model images that correspond to the 6 products
  const models = [
    "/assets/model/model1.webp",
    "/assets/model/model2.webp",
    "/assets/model/model3.webp",
    "/assets/model/model4.webp",
    "/assets/model/model5.webp",
    "/assets/model/model6.webp",
  ];

  // Custom visual scale multipliers to compensate for AI generation bulkiness (head/shoulder proportions)
  const visualTweaks = [
    { scale: 0.90, y: "3%" },   // model1 (White Tee - very bulky)
    { scale: 0.88, y: "4%" },   // model2 (Tote/Black Tee - bulky)
    { scale: 0.89, y: "3.5%" }, // model3 (White Hoodie - bulky)
    { scale: 0.94, y: "1.5%" }, // model4 (Black Hoodie variant)
    { scale: 1.00, y: "0%" },   // model5 (MED Hoodie - perfect baseline)
    { scale: 0.95, y: "1%" },   // model6
  ];

  return (
    <div style={{
        position: "absolute",
        bottom: "7%",
        left: "50%",
        transform: "translateX(-50%)",
        height,
        width: "100%", // Container width to center the absolute images
        pointerEvents: "none",
        zIndex: 3,
        display: "flex",
        justifyContent: "center"
    }}>
      {/* Default Base Model (visible when nothing is hovered) */}
      <img
        src="/assets/mannequin-hoodie.webp"
        alt="Default model"
        style={{
          height: "100%",
          width: "auto",
          position: "absolute",
          transition: "opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          opacity: activeIndex === null ? 1 : 0,
          transformOrigin: "bottom center",
          willChange: "opacity"
        }}
      />
      
      {/* Dynamic Hover Models */}
      {models.map((src, idx) => {
        const tweak = visualTweaks[idx];
        return (
          <img
            key={idx}
            src={src}
            alt={`Model ${idx + 1}`}
            style={{
              height: "100%",
              width: "auto",
              position: "absolute",
              transformOrigin: "bottom center",
              transition: "opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
              opacity: activeIndex === idx ? 1 : 0,
              // Apply the custom visual scale + translation for exact floor alignment
              transform: activeIndex === idx 
                ? `translateY(${tweak.y}) scale(${tweak.scale})` 
                : `translateY(${tweak.y}) scale(${tweak.scale * 0.98})`,
              willChange: "opacity, transform"
            }}
          />
        );
      })}
    </div>
  );
}

