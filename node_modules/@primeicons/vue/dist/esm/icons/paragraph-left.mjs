import { defineComponent as a, openBlock as t, createBlock as o, unref as n, normalizeProps as p, guardReactiveProps as c } from "vue";
import { paragraphLeft as f } from "@primeicons/core/paragraph-left";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ a({
  name: "ParagraphLeft",
  inheritAttrs: !1,
  __name: "paragraph-left",
  setup(s) {
    const { Icon: r } = m(f);
    return (e, i) => (t(), o(n(r), p(c(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
