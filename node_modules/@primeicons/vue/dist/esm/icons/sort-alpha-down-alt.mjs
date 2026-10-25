import { defineComponent as t, openBlock as e, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as l } from "vue";
import { sortAlphaDownAlt as s } from "@primeicons/core/sort-alpha-down-alt";
import { createIcon as c } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "SortAlphaDownAlt",
  inheritAttrs: !1,
  __name: "sort-alpha-down-alt",
  setup(m) {
    const { Icon: o } = c(s);
    return (r, i) => (e(), n(a(o), p(l(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
