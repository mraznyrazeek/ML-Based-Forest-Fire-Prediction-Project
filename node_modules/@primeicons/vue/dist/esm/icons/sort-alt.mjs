import { defineComponent as o, openBlock as e, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { sortAlt as m } from "@primeicons/core/sort-alt";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "SortAlt",
  inheritAttrs: !1,
  __name: "sort-alt",
  setup(l) {
    const { Icon: r } = p(m);
    return (t, i) => (e(), n(a(r), s(c(t.$attrs)), null, 16));
  }
});
export {
  d as default
};
