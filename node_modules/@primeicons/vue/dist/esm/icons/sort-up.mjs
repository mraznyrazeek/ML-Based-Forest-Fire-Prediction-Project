import { defineComponent as e, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as s } from "vue";
import { sortUp as c } from "@primeicons/core/sort-up";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "SortUp",
  inheritAttrs: !1,
  __name: "sort-up",
  setup(i) {
    const { Icon: r } = m(c);
    return (o, f) => (t(), n(p(r), a(s(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
