import "./stats.css";
import { esc } from "../../lib/html.js";

export function stats({ anchor, items = [] }) {
  return `
    <section class="stats" ${anchor ? `id="${esc(anchor)}"` : ""}>
      ${items
        .map(
          ({ value, label }) => `
        <div class="stat">
          <span class="stat__value">${esc(value)}</span>
          <span class="stat__label">${esc(label)}</span>
        </div>`,
        )
        .join("")}
    </section>
  `;
}
