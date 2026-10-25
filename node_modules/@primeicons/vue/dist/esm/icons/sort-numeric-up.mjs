import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as m, guardReactiveProps as p } from "vue";
import { sortNumericUp as a } from "@primeicons/core/sort-numeric-up";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "SortNumericUp",
  inheritAttrs: !1,
  __name: "sort-numeric-up",
  setup(i) {
    const { Icon: r } = s(a);
    return (e, u) => (t(), n(c(r), m(p(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
