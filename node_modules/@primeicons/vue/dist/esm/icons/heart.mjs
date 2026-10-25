import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { heart as p } from "@primeicons/core/heart";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "Heart",
  inheritAttrs: !1,
  __name: "heart",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (o(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
