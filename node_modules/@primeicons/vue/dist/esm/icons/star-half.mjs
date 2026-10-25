import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as s, guardReactiveProps as c } from "vue";
import { starHalf as f } from "@primeicons/core/star-half";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "StarHalf",
  inheritAttrs: !1,
  __name: "star-half",
  setup(p) {
    const { Icon: r } = m(f);
    return (e, l) => (o(), a(n(r), s(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
