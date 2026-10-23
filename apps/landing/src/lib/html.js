const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

// Контент приходить із CMS, тому все, що йде в innerHTML, екрануємо.
export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

// Дозволяємо лише безпечні посилання (http/https/mailto/tel, якорі, відносні шляхи).
export function safeHref(value) {
  const href = String(value ?? "").trim();
  return /^(https?:|mailto:|tel:|#|\/)/i.test(href) ? esc(href) : "#";
}
