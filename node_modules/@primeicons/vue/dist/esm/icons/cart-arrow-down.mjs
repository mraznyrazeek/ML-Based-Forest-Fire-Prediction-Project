import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { cartArrowDown as p } from "@primeicons/core/cart-arrow-down";
import { createIcon as s } from "@primeicons/vue/core";
const w = /* @__PURE__ */ e({
  name: "CartArrowDown",
  inheritAttrs: !1,
  __name: "cart-arrow-down",
  setup(i) {
    const { Icon: r } = s(p);
    return (o, f) => (t(), n(a(r), c(m(o.$attrs)), null, 16));
  }
});
export {
  w as default
};
