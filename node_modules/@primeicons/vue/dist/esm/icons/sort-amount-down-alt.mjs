import { defineComponent as r, openBlock as n, createBlock as e, unref as a, normalizeProps as m, guardReactiveProps as s } from "vue";
import { sortAmountDownAlt as c } from "@primeicons/core/sort-amount-down-alt";
import { createIcon as p } from "@primeicons/vue/core";
const A = /* @__PURE__ */ r({
  name: "SortAmountDownAlt",
  inheritAttrs: !1,
  __name: "sort-amount-down-alt",
  setup(l) {
    const { Icon: o } = p(c);
    return (t, u) => (n(), e(a(o), m(s(t.$attrs)), null, 16));
  }
});
export {
  A as default
};
