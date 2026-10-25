import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { filter as m } from "@primeicons/core/filter";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Filter",
  inheritAttrs: !1,
  __name: "filter",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, f) => (o(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
