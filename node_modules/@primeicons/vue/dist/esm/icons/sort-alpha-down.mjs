import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as s } from "vue";
import { sortAlphaDown as c } from "@primeicons/core/sort-alpha-down";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "SortAlphaDown",
  inheritAttrs: !1,
  __name: "sort-alpha-down",
  setup(l) {
    const { Icon: o } = m(c);
    return (r, i) => (t(), n(a(o), p(s(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
