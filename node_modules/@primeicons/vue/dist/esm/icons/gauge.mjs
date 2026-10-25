import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { gauge as p } from "@primeicons/core/gauge";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ o({
  name: "Gauge",
  inheritAttrs: !1,
  __name: "gauge",
  setup(u) {
    const { Icon: e } = s(p);
    return (r, i) => (t(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
