import "./steps.css";
import { esc } from "../../lib/html.js";

export function steps({ anchor, title, items = [] }) {
  return `
    <section class="steps" ${anchor ? `id="${esc(anchor)}"` : ""}>
      <h2 class="section-title">${esc(title)}</h2>
      <ol class="steps__list">
        ${items
          .map(
            ({ title, text }) => `
          <li class="step">
            <h3 class="step__title">${esc(title)}</h3>
            ${text ? `<p class="step__text">${esc(text)}</p>` : ""}
          </li>`,
          )
          .join("")}
      </ol>
    </section>
  `;
}
