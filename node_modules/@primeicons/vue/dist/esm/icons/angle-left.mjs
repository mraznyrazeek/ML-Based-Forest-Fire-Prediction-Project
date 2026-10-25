import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as f } from "vue";
import { angleLeft as l } from "@primeicons/core/angle-left";
import { createIcon as m } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "AngleLeft",
  inheritAttrs: !1,
  __name: "angle-left",
  setup(p) {
    const { Icon: e } = m(l);
    return (r, s) => (n(), o(a(e), c(f(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
