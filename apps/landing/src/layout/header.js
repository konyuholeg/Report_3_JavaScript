import { esc, safeHref } from "../lib/html.js";

export function header({ siteName, menu = [] }) {
  return `
    <header class="header">
      <a class="header__logo" href="/">${esc(siteName)}</a>
      <nav class="header__nav">
        ${menu
          .map(
            ({ label, link }) =>
              `<a class="header__link" href="${safeHref(link)}">${esc(label)}</a>`,
          )
          .join("")}
      </nav>
    </header>
  `;
}
