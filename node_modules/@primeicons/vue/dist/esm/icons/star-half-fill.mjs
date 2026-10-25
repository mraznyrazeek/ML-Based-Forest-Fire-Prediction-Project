import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as l, guardReactiveProps as s } from "vue";
import { starHalfFill as c } from "@primeicons/core/star-half-fill";
import { createIcon as f } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "StarHalfFill",
  inheritAttrs: !1,
  __name: "star-half-fill",
  setup(i) {
    const { Icon: r } = f(c);
    return (e, m) => (o(), a(n(r), l(s(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
