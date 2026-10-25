import { defineComponent as e, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { sortNumericDownAlt as s } from "@primeicons/core/sort-numeric-down-alt";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "SortNumericDownAlt",
  inheritAttrs: !1,
  __name: "sort-numeric-down-alt",
  setup(p) {
    const { Icon: r } = i(s);
    return (o, l) => (t(), n(c(r), a(m(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
