import "./features.css";
import { esc } from "../../lib/html.js";
import { icon as renderIcon } from "../../lib/icons.js";

export function features({ anchor, title, items = [] }) {
  return `
    <section class="features" ${anchor ? `id="${esc(anchor)}"` : ""}>
      <h2 class="section-title">${esc(title)}</h2>
      <div class="features__grid">
        ${items
          .map(
            ({ icon, title, text }) => `
          <article class="feature">
            ${renderIcon(icon) ? `<span class="feature__icon">${renderIcon(icon)}</span>` : ""}
            <h3 class="feature__title">${esc(title)}</h3>
            ${text ? `<p class="feature__text">${esc(text)}</p>` : ""}
          </article>`,
          )
          .join("")}
      </div>
    </section>
  `;
}
