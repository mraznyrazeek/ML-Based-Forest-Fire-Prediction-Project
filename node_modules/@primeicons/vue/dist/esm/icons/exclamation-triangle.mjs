import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { exclamationTriangle as m } from "@primeicons/core/exclamation-triangle";
import { createIcon as l } from "@primeicons/vue/core";
const g = /* @__PURE__ */ n({
  name: "ExclamationTriangle",
  inheritAttrs: !1,
  __name: "exclamation-triangle",
  setup(p) {
    const { Icon: e } = l(m);
    return (r, s) => (o(), t(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
