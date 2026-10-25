import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { wavePulse as p } from "@primeicons/core/wave-pulse";
import { createIcon as m } from "@primeicons/vue/core";
const v = /* @__PURE__ */ o({
  name: "WavePulse",
  inheritAttrs: !1,
  __name: "wave-pulse",
  setup(l) {
    const { Icon: e } = m(p);
    return (r, u) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  v as default
};
