import { defineComponent as t, openBlock as o, createBlock as n, unref as i, normalizeProps as a, guardReactiveProps as c } from "vue";
import { highlighter as m } from "@primeicons/core/highlighter";
import { createIcon as p } from "@primeicons/vue/core";
const u = /* @__PURE__ */ t({
  name: "Highlighter",
  inheritAttrs: !1,
  __name: "highlighter",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, h) => (o(), n(i(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  u as default
};
