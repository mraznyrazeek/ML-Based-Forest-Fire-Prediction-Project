import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { chartPie as p } from "@primeicons/core/chart-pie";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ChartPie",
  inheritAttrs: !1,
  __name: "chart-pie",
  setup(s) {
    const { Icon: e } = m(p);
    return (r, f) => (o(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
