import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as p, guardReactiveProps as s } from "vue";
import { stepForwardAlt as c } from "@primeicons/core/step-forward-alt";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "StepForwardAlt",
  inheritAttrs: !1,
  __name: "step-forward-alt",
  setup(l) {
    const { Icon: r } = m(c);
    return (e, f) => (o(), a(n(r), p(s(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
