import { defineComponent as t, openBlock as e, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as p } from "vue";
import { sortAmountUp as s } from "@primeicons/core/sort-amount-up";
import { createIcon as c } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "SortAmountUp",
  inheritAttrs: !1,
  __name: "sort-amount-up",
  setup(u) {
    const { Icon: o } = c(s);
    return (r, i) => (e(), n(a(o), m(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
