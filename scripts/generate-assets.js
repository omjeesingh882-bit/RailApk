import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function createIcon(size, isMaskable = false) {
  const png = new PNG({ width: size, height: size });
  const center = size / 2;
  const radius = size * 0.44;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background: Deep Slate gradient (#0f172a to #1e293b)
      const gradRatio = (y / size);
      let r = Math.round(15 + gradRatio * 15);
      let g = Math.round(23 + gradRatio * 25);
      let b = Math.round(42 + gradRatio * 35);
      let a = 255;

      if (!isMaskable && dist > radius) {
        // Transparent outside rounded circle for standard icons
        const edge = dist - radius;
        if (edge < 1) {
          a = Math.round(255 * (1 - edge));
        } else {
          a = 0;
        }
      }

      // Draw Golden Amber circle border
      if (dist < radius && dist > radius - size * 0.04) {
        r = 245; g = 158; b = 11; a = 255;
      }

      // Draw stylized Train Locomotive in center
      const trainWidth = size * 0.44;
      const trainHeight = size * 0.52;
      const trainTop = center - trainHeight * 0.48;
      const trainBottom = center + trainHeight * 0.52;
      const trainLeft = center - trainWidth / 2;
      const trainRight = center + trainWidth / 2;

      if (x >= trainLeft && x <= trainRight && y >= trainTop && y <= trainBottom) {
        // Train Body (Amber / Orange gradient #f59e0b)
        r = 245; g = 158; b = 11; a = 255;

        // Train Windshield Glass
        const winTop = trainTop + trainHeight * 0.15;
        const winBottom = trainTop + trainHeight * 0.42;
        const winLeft = trainLeft + trainWidth * 0.12;
        const winRight = trainRight - trainWidth * 0.12;
        if (x >= winLeft && x <= winRight && y >= winTop && y <= winBottom) {
          r = 15; g = 23; b = 42; // Deep windshield
        }

        // Twin Headlights
        const lightY = trainTop + trainHeight * 0.65;
        const light1X = trainLeft + trainWidth * 0.22;
        const light2X = trainRight - trainWidth * 0.22;
        const lightDist1 = Math.sqrt((x - light1X) ** 2 + (y - lightY) ** 2);
        const lightDist2 = Math.sqrt((x - light2X) ** 2 + (y - lightY) ** 2);
        if (lightDist1 < size * 0.045 || lightDist2 < size * 0.045) {
          r = 255; g = 255; b = 255; // Bright white lights
        }

        // Train Cowcatcher / Grille stripes
        if (y > trainBottom - trainHeight * 0.2) {
          if ((Math.floor(x / (size * 0.03)) % 2) === 0) {
            r = 217; g = 119; b = 6;
          }
        }
      }

      // Track rails under train
      const trackY = trainBottom + size * 0.05;
      if (y >= trackY && y <= trackY + size * 0.02 && Math.abs(dx) < size * 0.35) {
        r = 245; g = 158; b = 11;
      }

      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }

  return png;
}

function createScreenshot(width, height, isMobile = false) {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      
      // Top header bar (Amber #f59e0b)
      if (y < height * 0.08) {
        png.data[idx] = 245;
        png.data[idx + 1] = 158;
        png.data[idx + 2] = 11;
        png.data[idx + 3] = 255;
      } else {
        // App canvas dark background (#0f172a to #1e293b)
        const ratio = y / height;
        png.data[idx] = Math.round(15 + ratio * 15);
        png.data[idx + 1] = Math.round(23 + ratio * 20);
        png.data[idx + 2] = Math.round(42 + ratio * 25);
        png.data[idx + 3] = 255;

        // Cards representation
        const cardMargin = width * 0.08;
        const cardWidth = width - cardMargin * 2;
        const card1Top = height * 0.12;
        const card1Height = height * 0.25;
        const card2Top = height * 0.40;
        const card2Height = height * 0.45;

        if ((y >= card1Top && y <= card1Top + card1Height && x >= cardMargin && x <= cardMargin + cardWidth) ||
            (y >= card2Top && y <= card2Top + card2Height && x >= cardMargin && x <= cardMargin + cardWidth)) {
          png.data[idx] = 30;
          png.data[idx + 1] = 41;
          png.data[idx + 2] = 59;
          png.data[idx + 3] = 255;
        }
      }
    }
  }
  return png;
}

// Generate Icons
const iconSizes = [192, 512];
iconSizes.forEach((size) => {
  const icon = createIcon(size, false);
  fs.writeFileSync(path.join(publicDir, `icon-${size}.png`), PNG.sync.write(icon));

  const maskableIcon = createIcon(size, true);
  fs.writeFileSync(path.join(publicDir, `icon-${size}-maskable.png`), PNG.sync.write(maskableIcon));
  console.log(`Generated icon-${size}.png and icon-${size}-maskable.png`);
});

// Generate Screenshots
const screenDesktop = createScreenshot(1280, 720, false);
fs.writeFileSync(path.join(publicDir, 'screenshot-desktop.png'), PNG.sync.write(screenDesktop));

const screenMobile = createScreenshot(720, 1280, true);
fs.writeFileSync(path.join(publicDir, 'screenshot-mobile.png'), PNG.sync.write(screenMobile));

console.log('All icons and screenshots generated successfully!');
