import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as s } from "vue";
import { starFill as c } from "@primeicons/core/star-fill";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "StarFill",
  inheritAttrs: !1,
  __name: "star-fill",
  setup(m) {
    const { Icon: r } = i(c);
    return (e, p) => (o(), n(a(r), l(s(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
