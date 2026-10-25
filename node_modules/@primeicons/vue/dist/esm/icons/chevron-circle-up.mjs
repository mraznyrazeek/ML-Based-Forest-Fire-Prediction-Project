import { defineComponent as o, openBlock as n, createBlock as t, unref as c, normalizeProps as p, guardReactiveProps as a } from "vue";
import { chevronCircleUp as i } from "@primeicons/core/chevron-circle-up";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "ChevronCircleUp",
  inheritAttrs: !1,
  __name: "chevron-circle-up",
  setup(s) {
    const { Icon: e } = m(i);
    return (r, l) => (n(), t(c(e), p(a(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
