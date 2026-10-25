import { defineComponent as o, openBlock as n, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { penToSquare as s } from "@primeicons/core/pen-to-square";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "PenToSquare",
  inheritAttrs: !1,
  __name: "pen-to-square",
  setup(u) {
    const { Icon: e } = m(s);
    return (r, i) => (n(), t(a(e), p(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
