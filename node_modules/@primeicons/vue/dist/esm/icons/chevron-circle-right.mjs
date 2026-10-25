import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as i, guardReactiveProps as a } from "vue";
import { chevronCircleRight as m } from "@primeicons/core/chevron-circle-right";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ o({
  name: "ChevronCircleRight",
  inheritAttrs: !1,
  __name: "chevron-circle-right",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, l) => (t(), n(c(r), i(a(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
