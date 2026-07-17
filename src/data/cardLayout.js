// Card positions matching the Figma fan arc
// Each entry: rotateY (facing inward), translateX (vw), translateY (vh offset), scale, zIndex
export const CARD_LAYOUT = [
  // Left side — ordered outer to inner
  { index: 0, rotateY: 42,  x: -42, y: 8,   scale: 0.72, zIndex: 1 },  // Far left  — TEE
  { index: 1, rotateY: 24,  x: -26, y: 14,  scale: 0.84, zIndex: 2 },  // Mid left  — TOTE BAG
  { index: 2, rotateY: 11,  x: -13, y: 18,  scale: 0.94, zIndex: 3 },  // Near left — HOODIE
  // Right side — ordered inner to outer
  { index: 3, rotateY: -11, x:  13, y: 18,  scale: 0.94, zIndex: 3 },  // Near right — TEE
  { index: 4, rotateY: -24, x:  26, y: 14,  scale: 0.84, zIndex: 2 },  // Mid right  — POSTER
  { index: 5, rotateY: -42, x:  42, y: 8,   scale: 0.72, zIndex: 1 },  // Far right  — HOODIE
];
