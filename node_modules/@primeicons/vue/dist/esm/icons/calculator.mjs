import { defineComponent as e, openBlock as t, createBlock as a, unref as c, normalizeProps as n, guardReactiveProps as l } from "vue";
import { calculator as m } from "@primeicons/core/calculator";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Calculator",
  inheritAttrs: !1,
  __name: "calculator",
  setup(s) {
    const { Icon: r } = p(m);
    return (o, u) => (t(), a(c(r), n(l(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
