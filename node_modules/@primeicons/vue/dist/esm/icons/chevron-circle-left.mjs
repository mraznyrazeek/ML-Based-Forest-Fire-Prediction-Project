import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { chevronCircleLeft as f } from "@primeicons/core/chevron-circle-left";
import { createIcon as l } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "ChevronCircleLeft",
  inheritAttrs: !1,
  __name: "chevron-circle-left",
  setup(m) {
    const { Icon: e } = l(f);
    return (r, p) => (t(), n(c(e), a(i(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
