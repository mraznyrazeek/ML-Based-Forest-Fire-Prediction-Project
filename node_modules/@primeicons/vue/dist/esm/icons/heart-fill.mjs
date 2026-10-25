import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { heartFill as i } from "@primeicons/core/heart-fill";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "HeartFill",
  inheritAttrs: !1,
  __name: "heart-fill",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, s) => (o(), n(a(e), l(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
