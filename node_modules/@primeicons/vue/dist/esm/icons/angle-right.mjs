import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { angleRight as m } from "@primeicons/core/angle-right";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ t({
  name: "AngleRight",
  inheritAttrs: !1,
  __name: "angle-right",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (n(), o(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  _ as default
};
