import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { square as m } from "@primeicons/core/square";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Square",
  inheritAttrs: !1,
  __name: "square",
  setup(u) {
    const { Icon: e } = p(m);
    return (r, i) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
