import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { chartLine as m } from "@primeicons/core/chart-line";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ChartLine",
  inheritAttrs: !1,
  __name: "chart-line",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, f) => (n(), o(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
