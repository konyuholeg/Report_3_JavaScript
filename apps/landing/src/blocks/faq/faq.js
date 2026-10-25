import "./faq.css";
import { esc } from "../../lib/html.js";

export function faq({ anchor, title, items = [] }) {
  return `
    <section class="faq" ${anchor ? `id="${esc(anchor)}"` : ""}>
      <h2 class="section-title">${esc(title)}</h2>
      <div class="faq__list">
        ${items
          .map(
            ({ question, answer }) => `
          <details class="faq__item">
            <summary class="faq__question">${esc(question)}</summary>
            <p class="faq__answer">${esc(answer)}</p>
          </details>`,
          )
          .join("")}
      </div>
    </section>
  `;
}
