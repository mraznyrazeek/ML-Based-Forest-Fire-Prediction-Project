import { defineComponent as e, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as l } from "vue";
import { sortUpFill as s } from "@primeicons/core/sort-up-fill";
import { createIcon as c } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "SortUpFill",
  inheritAttrs: !1,
  __name: "sort-up-fill",
  setup(i) {
    const { Icon: r } = c(s);
    return (o, m) => (t(), n(p(r), a(l(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
