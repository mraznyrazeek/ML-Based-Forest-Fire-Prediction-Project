import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { chevronRight as m } from "@primeicons/core/chevron-right";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ o({
  name: "ChevronRight",
  inheritAttrs: !1,
  __name: "chevron-right",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, f) => (t(), n(c(r), a(i(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
