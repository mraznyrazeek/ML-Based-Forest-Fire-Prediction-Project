import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as s } from "vue";
import { cartMinus as i } from "@primeicons/core/cart-minus";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "CartMinus",
  inheritAttrs: !1,
  __name: "cart-minus",
  setup(p) {
    const { Icon: r } = m(i);
    return (e, u) => (n(), o(a(r), c(s(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
