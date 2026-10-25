import { defineComponent as o, openBlock as e, createBlock as a, unref as n, normalizeProps as s, guardReactiveProps as l } from "vue";
import { sortAltSlash as c } from "@primeicons/core/sort-alt-slash";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "SortAltSlash",
  inheritAttrs: !1,
  __name: "sort-alt-slash",
  setup(p) {
    const { Icon: r } = m(c);
    return (t, i) => (e(), a(n(r), s(l(t.$attrs)), null, 16));
  }
});
export {
  h as default
};
