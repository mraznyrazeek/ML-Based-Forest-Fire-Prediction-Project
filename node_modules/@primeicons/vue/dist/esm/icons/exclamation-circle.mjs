import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { exclamationCircle as m } from "@primeicons/core/exclamation-circle";
import { createIcon as l } from "@primeicons/vue/core";
const x = /* @__PURE__ */ o({
  name: "ExclamationCircle",
  inheritAttrs: !1,
  __name: "exclamation-circle",
  setup(p) {
    const { Icon: e } = l(m);
    return (r, s) => (t(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  x as default
};
