import { defineComponent as n, openBlock as t, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { alignCenter as m } from "@primeicons/core/align-center";
import { createIcon as p } from "@primeicons/vue/core";
const g = /* @__PURE__ */ n({
  name: "AlignCenter",
  inheritAttrs: !1,
  __name: "align-center",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (t(), o(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
