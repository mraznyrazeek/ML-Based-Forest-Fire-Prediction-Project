import { defineComponent as e, openBlock as t, createBlock as a, unref as n, normalizeProps as p, guardReactiveProps as s } from "vue";
import { sortAlphaUp as c } from "@primeicons/core/sort-alpha-up";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "SortAlphaUp",
  inheritAttrs: !1,
  __name: "sort-alpha-up",
  setup(l) {
    const { Icon: r } = m(c);
    return (o, i) => (t(), a(n(r), p(s(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
