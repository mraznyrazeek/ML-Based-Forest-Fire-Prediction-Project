import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as m, guardReactiveProps as s } from "vue";
import { instagram as c } from "@primeicons/core/instagram";
import { createIcon as i } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "Instagram",
  inheritAttrs: !1,
  __name: "instagram",
  setup(p) {
    const { Icon: r } = i(c);
    return (e, f) => (n(), o(a(r), m(s(e.$attrs)), null, 16));
  }
});
export {
  g as default
};
