import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { bell as m } from "@primeicons/core/bell";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Bell",
  inheritAttrs: !1,
  __name: "bell",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, i) => (t(), n(a(e), l(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
