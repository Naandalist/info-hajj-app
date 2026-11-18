// Renders src/index.html into Play Store screenshots (1080x1920 PNG).
// Usage: node store-screenshot/render.js
const {execFileSync} = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');

const W = 1080;
const H = 1920;
const NAMES = [
  '01-nomor-porsi',
  '02-estimasi-keberangkatan',
  '03-status-pelunasan',
  '04-jadwal-kloter',
  '05-akomodasi-hotel',
  '06-berita-haji',
];
const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const dir = __dirname;
const html = 'file://' + path.join(dir, 'src', 'index.html');
const full = path.join(os.tmpdir(), 'infohaji-store-full.png');

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--allow-file-access-from-files',
  '--force-device-scale-factor=1',
  '--virtual-time-budget=8000',
  `--window-size=${W},${H * NAMES.length}`,
  `--screenshot=${full}`,
  html,
]);

(async () => {
  for (const [i, name] of NAMES.entries()) {
    const out = path.join(dir, `${name}.png`);
    await sharp(full)
      .extract({left: 0, top: i * H, width: W, height: H})
      .flatten({background: '#ffffff'})
      .png()
      .toFile(out);
    console.log('wrote', path.relative(process.cwd(), out));
  }
  fs.unlinkSync(full);

  // Feature graphic (1024x500, 24-bit PNG without alpha).
  // Rendered at 2x and downsampled for crisp edges.
  const fgTmp = path.join(os.tmpdir(), 'infohaji-feature.png');
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=2',
    '--virtual-time-budget=5000',
    '--window-size=1024,500',
    `--screenshot=${fgTmp}`,
    'file://' + path.join(dir, 'src', 'feature.html'),
  ]);
  const fgOut = path.join(dir, 'feature-graphic.png');
  await sharp(fgTmp)
    .extract({left: 0, top: 0, width: 2048, height: 1000})
    .resize(1024, 500, {kernel: 'lanczos3'})
    .flatten({background: '#11301a'})
    .removeAlpha()
    .png()
    .toFile(fgOut);
  fs.unlinkSync(fgTmp);
  console.log('wrote', path.relative(process.cwd(), fgOut));
})();
