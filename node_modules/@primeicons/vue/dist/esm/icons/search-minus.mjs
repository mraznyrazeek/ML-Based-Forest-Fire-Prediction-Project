import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { searchMinus as i } from "@primeicons/core/search-minus";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ n({
  name: "SearchMinus",
  inheritAttrs: !1,
  __name: "search-minus",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, u) => (o(), t(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
