import { hero } from "./blocks/hero/hero.js";
import { stats } from "./blocks/stats/stats.js";
import { features } from "./blocks/features/features.js";
import { steps } from "./blocks/steps/steps.js";
import { faq } from "./blocks/faq/faq.js";
import { cta } from "./blocks/cta/cta.js";

const renderers = { hero, stats, features, steps, faq, cta };

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
