import { defineComponent as r, openBlock as e, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as p } from "vue";
import { sortAmountUpAlt as s } from "@primeicons/core/sort-amount-up-alt";
import { createIcon as c } from "@primeicons/vue/core";
const A = /* @__PURE__ */ r({
  name: "SortAmountUpAlt",
  inheritAttrs: !1,
  __name: "sort-amount-up-alt",
  setup(u) {
    const { Icon: t } = c(s);
    return (o, l) => (e(), n(a(t), m(p(o.$attrs)), null, 16));
  }
});
export {
  A as default
};
