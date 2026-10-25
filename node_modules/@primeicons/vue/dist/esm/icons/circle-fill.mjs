import { defineComponent as o, openBlock as t, createBlock as c, unref as n, normalizeProps as l, guardReactiveProps as i } from "vue";
import { circleFill as a } from "@primeicons/core/circle-fill";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "CircleFill",
  inheritAttrs: !1,
  __name: "circle-fill",
  setup(p) {
    const { Icon: e } = m(a);
    return (r, s) => (t(), c(n(e), l(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
