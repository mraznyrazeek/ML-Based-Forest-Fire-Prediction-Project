import { defineComponent as e, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { shoppingCart as s } from "@primeicons/core/shopping-cart";
import { createIcon as i } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "ShoppingCart",
  inheritAttrs: !1,
  __name: "shopping-cart",
  setup(m) {
    const { Icon: r } = i(s);
    return (o, f) => (t(), n(p(r), a(c(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
