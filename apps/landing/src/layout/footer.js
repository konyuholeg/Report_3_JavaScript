import { esc } from "../lib/html.js";

export function footer({ siteName, footer }) {
  const year = new Date().getFullYear();

  return `
    <footer class="footer">© ${year} ${esc(siteName)}. ${esc(footer?.text)}</footer>
  `;
}
