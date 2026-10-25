import { defineComponent as r, openBlock as o, createBlock as t, unref as a, normalizeProps as i, guardReactiveProps as p } from "vue";
import { indianRupee as c } from "@primeicons/core/indian-rupee";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "IndianRupee",
  inheritAttrs: !1,
  __name: "indian-rupee",
  setup(s) {
    const { Icon: e } = m(c);
    return (n, u) => (o(), t(a(e), i(p(n.$attrs)), null, 16));
  }
});
export {
  d as default
};
