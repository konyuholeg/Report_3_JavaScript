import "./cta.css";
import { esc, safeHref } from "../../lib/html.js";

export function cta({ anchor, title, text, buttonText, buttonLink }) {
  return `
    <section class="cta" ${anchor ? `id="${esc(anchor)}"` : ""}>
      <h2 class="cta__title">${esc(title)}</h2>
      ${text ? `<p class="cta__text">${esc(text)}</p>` : ""}
      <a class="btn btn--primary" href="${safeHref(buttonLink)}">${esc(buttonText)}</a>
    </section>
  `;
}
