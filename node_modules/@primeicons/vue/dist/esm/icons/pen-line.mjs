import { defineComponent as r, openBlock as o, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { penLine as i } from "@primeicons/core/pen-line";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "PenLine",
  inheritAttrs: !1,
  __name: "pen-line",
  setup(s) {
    const { Icon: e } = m(i);
    return (n, f) => (o(), t(a(e), p(c(n.$attrs)), null, 16));
  }
});
export {
  d as default
};
