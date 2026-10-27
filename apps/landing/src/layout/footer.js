import { esc } from "../lib/html.js";

export function footer({ siteName, footer }) {
  const year = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="container">© ${year} ${esc(siteName)}. ${esc(footer?.text)}</div>
    </footer>
  `;
}
