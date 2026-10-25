import { defineComponent as e, openBlock as o, createBlock as a, unref as c, normalizeProps as n, guardReactiveProps as s } from "vue";
import { chartScatter as m } from "@primeicons/core/chart-scatter";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "ChartScatter",
  inheritAttrs: !1,
  __name: "chart-scatter",
  setup(i) {
    const { Icon: r } = p(m);
    return (t, f) => (o(), a(c(r), n(s(t.$attrs)), null, 16));
  }
});
export {
  h as default
};
