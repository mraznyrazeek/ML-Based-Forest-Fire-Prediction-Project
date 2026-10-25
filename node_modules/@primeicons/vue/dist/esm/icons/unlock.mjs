import { defineComponent as r, openBlock as n, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { unlock as p } from "@primeicons/core/unlock";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "Unlock",
  inheritAttrs: !1,
  __name: "unlock",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, i) => (n(), t(c(o), a(m(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
