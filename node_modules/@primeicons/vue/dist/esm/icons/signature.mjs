import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { signature as i } from "@primeicons/core/signature";
import { createIcon as m } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "Signature",
  inheritAttrs: !1,
  __name: "signature",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, u) => (n(), o(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
