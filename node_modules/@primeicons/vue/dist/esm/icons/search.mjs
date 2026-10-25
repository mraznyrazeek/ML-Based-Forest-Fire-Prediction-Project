import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as s } from "vue";
import { search as m } from "@primeicons/core/search";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "Search",
  inheritAttrs: !1,
  __name: "search",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, f) => (t(), n(a(e), c(s(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
