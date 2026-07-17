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
          willChange: "opacity"
        }}
      />
      
      {/* Dynamic Hover Models */}
      {models.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Model ${idx + 1}`}
          style={{
            height: "100%",
            width: "auto",
            position: "absolute",
            transition: "opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
            opacity: activeIndex === idx ? 1 : 0,
            transform: activeIndex === idx ? "scale(1)" : "scale(0.98)", // Premium slight pop-in
            willChange: "opacity, transform"
          }}
        />
      ))}
    </div>
  );
}
