import { defineComponent as e, openBlock as t, createBlock as o, unref as n, normalizeProps as p, guardReactiveProps as c } from "vue";
import { paragraphRight as i } from "@primeicons/core/paragraph-right";
import { createIcon as m } from "@primeicons/vue/core";
const u = /* @__PURE__ */ e({
  name: "ParagraphRight",
  inheritAttrs: !1,
  __name: "paragraph-right",
  setup(s) {
    const { Icon: r } = m(i);
    return (a, f) => (t(), o(n(r), p(c(a.$attrs)), null, 16));
  }
});
export {
  u as default
};
