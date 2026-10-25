import { defineComponent as e, openBlock as t, createBlock as n, unref as c, normalizeProps as m, guardReactiveProps as a } from "vue";
import { sortNumericDown as s } from "@primeicons/core/sort-numeric-down";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "SortNumericDown",
  inheritAttrs: !1,
  __name: "sort-numeric-down",
  setup(p) {
    const { Icon: r } = i(s);
    return (o, u) => (t(), n(c(r), m(a(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
