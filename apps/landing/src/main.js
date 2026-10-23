import "./styles/base.css";
import { getSettings, getPage } from "./api.js";
import { renderBlocks } from "./render.js";
import { header } from "./layout/header.js";
import { footer } from "./layout/footer.js";
import { esc } from "./lib/html.js";

const app = document.querySelector("#app");

async function start() {
  try {
    const [settings, page] = await Promise.all([
      getSettings(),
      getPage(location.pathname),
    ]);

    document.title = `${page.title} — ${settings.siteName}`;

    app.innerHTML = `
      ${header(settings)}
      <main>${renderBlocks(page.blocks)}</main>
      ${footer(settings)}
    `;
  } catch (error) {
    app.innerHTML = `<p class="state-error">Не вдалося завантажити сторінку: ${esc(error.message)}</p>`;
  }
}

start();
