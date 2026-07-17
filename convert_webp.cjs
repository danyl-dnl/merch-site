const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const tasks = [
  // Large critical assets
  { input: "public/assets/excelmerch.png", output: "public/assets/excelmerch.webp", quality: 85 },
  { input: "public/assets/mannequin-hoodie.png", output: "public/assets/mannequin-hoodie.webp", quality: 85 },
  // Dress product images
  { input: "public/assets/dress/dress1.png", output: "public/assets/dress/dress1.webp", quality: 82 },
  { input: "public/assets/dress/dress2.png", output: "public/assets/dress/dress2.webp", quality: 82 },
  { input: "public/assets/dress/dress3.png", output: "public/assets/dress/dress3.webp", quality: 82 },
  { input: "public/assets/dress/dress4 .png", output: "public/assets/dress/dress4.webp", quality: 82 },
  { input: "public/assets/dress/dress5.png", output: "public/assets/dress/dress5.webp", quality: 82 },
  { input: "public/assets/dress/dress6.png", output: "public/assets/dress/dress6.webp", quality: 82 },
  // Model hover images
  { input: "public/assets/model/model1.png", output: "public/assets/model/model1.webp", quality: 82 },
  { input: "public/assets/model/model2.png", output: "public/assets/model/model2.webp", quality: 82 },
  { input: "public/assets/model/model3.png", output: "public/assets/model/model3.webp", quality: 82 },
  { input: "public/assets/model/model4.png", output: "public/assets/model/model4.webp", quality: 82 },
  { input: "public/assets/model/model5.png", output: "public/assets/model/model5.webp", quality: 82 },
  { input: "public/assets/model/model6.png", output: "public/assets/model/model6.webp", quality: 82 },
];

async function run() {
  for (const t of tasks) {
    const before = fs.statSync(t.input).size;
    await sharp(t.input).webp({ quality: t.quality }).toFile(t.output);
    const after = fs.statSync(t.output).size;
    const saved = (((before - after) / before) * 100).toFixed(1);
    console.log(`✓ ${path.basename(t.output)} — ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (saved ${saved}%)`);
  }
  console.log("\nAll images converted to WebP!");
}

run().catch(console.error);
