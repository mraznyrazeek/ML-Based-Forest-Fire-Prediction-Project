import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as s } from "vue";
import { sortDownFill as c } from "@primeicons/core/sort-down-fill";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "SortDownFill",
  inheritAttrs: !1,
  __name: "sort-down-fill",
  setup(m) {
    const { Icon: o } = i(c);
    return (r, p) => (t(), n(a(o), l(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
