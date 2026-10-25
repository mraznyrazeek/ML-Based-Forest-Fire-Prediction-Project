import { defineComponent as t, openBlock as n, createBlock as e, unref as a, normalizeProps as m, guardReactiveProps as s } from "vue";
import { sortAmountDown as c } from "@primeicons/core/sort-amount-down";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "SortAmountDown",
  inheritAttrs: !1,
  __name: "sort-amount-down",
  setup(u) {
    const { Icon: o } = p(c);
    return (r, i) => (n(), e(a(o), m(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
