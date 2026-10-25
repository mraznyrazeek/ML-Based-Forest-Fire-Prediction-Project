import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { forward as p } from "@primeicons/core/forward";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Forward",
  inheritAttrs: !1,
  __name: "forward",
  setup(f) {
    const { Icon: r } = s(p);
    return (o, i) => (t(), n(a(r), c(m(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
