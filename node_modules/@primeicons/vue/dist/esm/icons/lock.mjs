import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { lock as p } from "@primeicons/core/lock";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "Lock",
  inheritAttrs: !1,
  __name: "lock",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, l) => (t(), n(c(o), a(m(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
