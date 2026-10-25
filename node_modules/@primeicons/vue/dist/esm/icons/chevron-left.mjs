import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as f } from "vue";
import { chevronLeft as m } from "@primeicons/core/chevron-left";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "ChevronLeft",
  inheritAttrs: !1,
  __name: "chevron-left",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, i) => (t(), n(c(e), a(f(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
