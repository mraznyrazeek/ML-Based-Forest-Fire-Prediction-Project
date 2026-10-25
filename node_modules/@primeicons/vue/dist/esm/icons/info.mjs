import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as f } from "vue";
import { info as i } from "@primeicons/core/info";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Info",
  inheritAttrs: !1,
  __name: "info",
  setup(p) {
    const { Icon: o } = m(i);
    return (e, s) => (n(), t(a(o), c(f(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
