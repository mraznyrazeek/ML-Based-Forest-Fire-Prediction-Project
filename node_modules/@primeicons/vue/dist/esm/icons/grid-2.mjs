import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { grid2 as m } from "@primeicons/core/grid-2";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Grid2",
  inheritAttrs: !1,
  __name: "grid-2",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, f) => (t(), n(a(r), c(i(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
