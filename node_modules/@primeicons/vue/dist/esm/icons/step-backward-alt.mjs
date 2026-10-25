import { defineComponent as t, openBlock as a, createBlock as o, unref as n, normalizeProps as c, guardReactiveProps as p } from "vue";
import { stepBackwardAlt as s } from "@primeicons/core/step-backward-alt";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "StepBackwardAlt",
  inheritAttrs: !1,
  __name: "step-backward-alt",
  setup(l) {
    const { Icon: e } = m(s);
    return (r, i) => (a(), o(n(e), c(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
