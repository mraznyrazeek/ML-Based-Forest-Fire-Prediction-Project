import { defineComponent as e, openBlock as t, createBlock as o, unref as n, normalizeProps as c, guardReactiveProps as s } from "vue";
import { fastBackward as m } from "@primeicons/core/fast-backward";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "FastBackward",
  inheritAttrs: !1,
  __name: "fast-backward",
  setup(f) {
    const { Icon: r } = p(m);
    return (a, i) => (t(), o(n(r), c(s(a.$attrs)), null, 16));
  }
});
export {
  d as default
};
