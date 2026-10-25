import { defineComponent as r, openBlock as n, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { chevronDown as p } from "@primeicons/core/chevron-down";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "ChevronDown",
  inheritAttrs: !1,
  __name: "chevron-down",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, f) => (n(), t(c(o), a(m(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
