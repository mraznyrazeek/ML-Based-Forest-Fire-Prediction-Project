import { defineComponent as r, openBlock as t, createBlock as c, unref as n, normalizeProps as a, guardReactiveProps as m } from "vue";
import { clock as p } from "@primeicons/core/clock";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "Clock",
  inheritAttrs: !1,
  __name: "clock",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, i) => (t(), c(n(o), a(m(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
