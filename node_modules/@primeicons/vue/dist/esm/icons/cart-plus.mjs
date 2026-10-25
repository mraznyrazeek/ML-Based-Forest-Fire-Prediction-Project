import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as s } from "vue";
import { cartPlus as p } from "@primeicons/core/cart-plus";
import { createIcon as m } from "@primeicons/vue/core";
const P = /* @__PURE__ */ t({
  name: "CartPlus",
  inheritAttrs: !1,
  __name: "cart-plus",
  setup(l) {
    const { Icon: r } = m(p);
    return (e, u) => (o(), n(a(r), c(s(e.$attrs)), null, 16));
  }
});
export {
  P as default
};
