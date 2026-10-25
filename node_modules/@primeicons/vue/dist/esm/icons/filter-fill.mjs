import { defineComponent as t, openBlock as o, createBlock as n, unref as l, normalizeProps as i, guardReactiveProps as a } from "vue";
import { filterFill as c } from "@primeicons/core/filter-fill";
import { createIcon as f } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "FilterFill",
  inheritAttrs: !1,
  __name: "filter-fill",
  setup(m) {
    const { Icon: e } = f(c);
    return (r, p) => (o(), n(l(e), i(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
