// Full-page screenshot via puppeteer-core + system Chrome
// Usage: node .claude/scripts/screenshot.mjs <url> <output.png> [mobile] [dark]

import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'fs'
import { dirname } from 'path'

const [,, url, output, ...flags] = process.argv

if (!url || !output) {
  console.error('Usage: node screenshot.mjs <url> <output.png> [mobile] [dark]')
  process.exit(1)
}

mkdirSync(dirname(output), { recursive: true })

const isMobile = flags.includes('mobile')
const isDark   = flags.includes('dark')

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: true,
})

const page = await browser.newPage()

if (isMobile) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true })
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
}

await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 })

// Forzar tema después de hidratación — ThemeProvider lee localStorage
await page.evaluate((dark) => {
  const theme = dark ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  document.documentElement.classList.toggle('dark', dark)
}, isDark)

// Esperar a que las transiciones CSS se asienten
await new Promise(r => setTimeout(r, 400))

await page.screenshot({ path: output, fullPage: true })

await browser.close()
console.log(`→ ${output}`)
