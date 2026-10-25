import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { searchPlus as p } from "@primeicons/core/search-plus";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "SearchPlus",
  inheritAttrs: !1,
  __name: "search-plus",
  setup(l) {
    const { Icon: e } = m(p);
    return (r, u) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
