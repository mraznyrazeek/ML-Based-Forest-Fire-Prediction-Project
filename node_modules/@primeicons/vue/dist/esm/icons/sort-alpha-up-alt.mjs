import { defineComponent as o, openBlock as e, createBlock as a, unref as n, normalizeProps as p, guardReactiveProps as l } from "vue";
import { sortAlphaUpAlt as s } from "@primeicons/core/sort-alpha-up-alt";
import { createIcon as c } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "SortAlphaUpAlt",
  inheritAttrs: !1,
  __name: "sort-alpha-up-alt",
  setup(m) {
    const { Icon: r } = c(s);
    return (t, i) => (e(), a(n(r), p(l(t.$attrs)), null, 16));
  }
});
export {
  h as default
};
