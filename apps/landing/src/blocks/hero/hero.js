import "./hero.css";
import { esc, safeHref } from "../../lib/html.js";

export function hero({ anchor, badge, title, subtitle, image, buttons = [] }) {
  return `
    <section class="hero" ${anchor ? `id="${esc(anchor)}"` : ""}>
      <div class="hero__content">
        ${badge ? `<span class="hero__badge">${esc(badge)}</span>` : ""}
        <h1 class="hero__title">${esc(title)}</h1>
        ${subtitle ? `<p class="hero__subtitle">${esc(subtitle)}</p>` : ""}
        <div class="hero__actions">
          ${buttons
            .map(
              ({ text, link, variant }) =>
                `<a class="btn btn--${variant === "secondary" ? "secondary" : "primary"}" href="${safeHref(link)}">${esc(text)}</a>`,
            )
            .join("")}
        </div>
      </div>
      ${image ? `<img class="hero__image" src="${esc(image.src)}" alt="${esc(image.alt)}">` : ""}
    </section>
  `;
}
