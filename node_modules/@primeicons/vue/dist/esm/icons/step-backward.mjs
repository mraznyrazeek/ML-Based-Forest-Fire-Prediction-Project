import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as c, guardReactiveProps as p } from "vue";
import { stepBackward as s } from "@primeicons/core/step-backward";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "StepBackward",
  inheritAttrs: !1,
  __name: "step-backward",
  setup(i) {
    const { Icon: e } = m(s);
    return (r, f) => (o(), a(n(e), c(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
