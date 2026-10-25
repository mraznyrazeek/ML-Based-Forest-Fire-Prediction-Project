import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as s } from "vue";
import { bellSlash as c } from "@primeicons/core/bell-slash";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "BellSlash",
  inheritAttrs: !1,
  __name: "bell-slash",
  setup(p) {
    const { Icon: e } = m(c);
    return (r, i) => (t(), n(a(e), l(s(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
