import { defineComponent as e, openBlock as t, createBlock as a, unref as n, normalizeProps as s, guardReactiveProps as c } from "vue";
import { fastForward as f } from "@primeicons/core/fast-forward";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "FastForward",
  inheritAttrs: !1,
  __name: "fast-forward",
  setup(p) {
    const { Icon: r } = m(f);
    return (o, i) => (t(), a(n(r), s(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
