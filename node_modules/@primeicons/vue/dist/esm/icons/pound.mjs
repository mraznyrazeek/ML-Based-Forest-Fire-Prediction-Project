import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { pound as m } from "@primeicons/core/pound";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Pound",
  inheritAttrs: !1,
  __name: "pound",
  setup(u) {
    const { Icon: o } = s(m);
    return (e, i) => (n(), t(a(o), p(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
