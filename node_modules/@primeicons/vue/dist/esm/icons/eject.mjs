import { defineComponent as t, openBlock as o, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { eject as p } from "@primeicons/core/eject";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Eject",
  inheritAttrs: !1,
  __name: "eject",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (o(), n(c(e), a(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
