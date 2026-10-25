import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as l } from "vue";
import { filterSlash as c } from "@primeicons/core/filter-slash";
import { createIcon as i } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "FilterSlash",
  inheritAttrs: !1,
  __name: "filter-slash",
  setup(m) {
    const { Icon: e } = i(c);
    return (r, p) => (o(), n(a(e), s(l(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
