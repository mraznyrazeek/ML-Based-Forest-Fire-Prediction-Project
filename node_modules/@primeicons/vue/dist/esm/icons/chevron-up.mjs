import { defineComponent as o, openBlock as n, createBlock as t, unref as c, normalizeProps as p, guardReactiveProps as a } from "vue";
import { chevronUp as m } from "@primeicons/core/chevron-up";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "ChevronUp",
  inheritAttrs: !1,
  __name: "chevron-up",
  setup(i) {
    const { Icon: e } = s(m);
    return (r, f) => (n(), t(c(e), p(a(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
