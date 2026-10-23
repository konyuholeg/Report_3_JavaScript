// Реєстр блоків: type (blockType з CMS) -> функція, що повертає HTML.
// Нові блоки додаються сюди по одному.
const renderers = {};

export function renderBlocks(blocks = []) {
  return blocks
    .map((block) => {
      const render = renderers[block.type];

      if (!render) {
        console.warn(`Block "${block.type}" is not supported`);
        return "";
      }

      return render(block);
    })
    .join("");
}
