import { defineComponent as t, openBlock as o, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { truck as p } from "@primeicons/core/truck";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ t({
  name: "Truck",
  inheritAttrs: !1,
  __name: "truck",
  setup(u) {
    const { Icon: r } = s(p);
    return (e, i) => (o(), n(c(r), a(m(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
