import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { sortDown as m } from "@primeicons/core/sort-down";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "SortDown",
  inheritAttrs: !1,
  __name: "sort-down",
  setup(i) {
    const { Icon: o } = p(m);
    return (r, f) => (t(), n(a(o), s(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
