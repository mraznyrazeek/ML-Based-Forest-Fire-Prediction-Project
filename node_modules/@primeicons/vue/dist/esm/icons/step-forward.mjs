import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as s } from "vue";
import { stepForward as c } from "@primeicons/core/step-forward";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "StepForward",
  inheritAttrs: !1,
  __name: "step-forward",
  setup(f) {
    const { Icon: r } = m(c);
    return (e, i) => (t(), n(a(r), p(s(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
