import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { barcode as p } from "@primeicons/core/barcode";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Barcode",
  inheritAttrs: !1,
  __name: "barcode",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (t(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
