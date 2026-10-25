import { defineComponent as o, openBlock as n, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { chevronCircleDown as m } from "@primeicons/core/chevron-circle-down";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "ChevronCircleDown",
  inheritAttrs: !1,
  __name: "chevron-circle-down",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (n(), t(c(e), a(i(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
