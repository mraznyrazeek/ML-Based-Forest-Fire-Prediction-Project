import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as c, guardReactiveProps as m } from "vue";
import { chartBar as p } from "@primeicons/core/chart-bar";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ChartBar",
  inheritAttrs: !1,
  __name: "chart-bar",
  setup(i) {
    const { Icon: r } = s(p);
    return (e, f) => (o(), a(n(r), c(m(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
