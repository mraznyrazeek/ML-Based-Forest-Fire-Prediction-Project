import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as p } from "vue";
import { percentage as m } from "@primeicons/core/percentage";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "Percentage",
  inheritAttrs: !1,
  __name: "percentage",
  setup(i) {
    const { Icon: e } = s(m);
    return (r, f) => (n(), o(a(e), c(p(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
