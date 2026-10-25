import { defineComponent as r, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { tablet as p } from "@primeicons/core/tablet";
import { createIcon as s } from "@primeicons/vue/core";
const b = /* @__PURE__ */ r({
  name: "Tablet",
  inheritAttrs: !1,
  __name: "tablet",
  setup(l) {
    const { Icon: e } = s(p);
    return (t, i) => (o(), n(a(e), c(m(t.$attrs)), null, 16));
  }
});
export {
  b as default
};
