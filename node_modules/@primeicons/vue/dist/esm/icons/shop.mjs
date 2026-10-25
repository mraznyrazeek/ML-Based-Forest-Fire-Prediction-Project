import { defineComponent as r, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as s } from "vue";
import { shop as c } from "@primeicons/core/shop";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "Shop",
  inheritAttrs: !1,
  __name: "shop",
  setup(i) {
    const { Icon: o } = m(c);
    return (e, f) => (t(), n(p(o), a(s(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
