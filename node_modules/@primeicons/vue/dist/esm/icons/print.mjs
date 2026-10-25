import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { print as i } from "@primeicons/core/print";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Print",
  inheritAttrs: !1,
  __name: "print",
  setup(s) {
    const { Icon: r } = m(i);
    return (e, f) => (n(), o(a(r), p(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
