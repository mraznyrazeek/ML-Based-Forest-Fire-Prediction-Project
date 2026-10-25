import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { wallet as m } from "@primeicons/core/wallet";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Wallet",
  inheritAttrs: !1,
  __name: "wallet",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, i) => (o(), n(a(e), l(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
