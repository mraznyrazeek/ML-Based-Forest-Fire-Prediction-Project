import { defineComponent as r, openBlock as n, createBlock as t, unref as p, normalizeProps as a, guardReactiveProps as s } from "vue";
import { shoppingBag as c } from "@primeicons/core/shopping-bag";
import { createIcon as i } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ r({
  name: "ShoppingBag",
  inheritAttrs: !1,
  __name: "shopping-bag",
  setup(m) {
    const { Icon: o } = i(c);
    return (e, f) => (n(), t(p(o), a(s(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
