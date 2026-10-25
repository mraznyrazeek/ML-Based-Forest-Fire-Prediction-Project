import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { gift as f } from "@primeicons/core/gift";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Gift",
  inheritAttrs: !1,
  __name: "gift",
  setup(p) {
    const { Icon: e } = m(f);
    return (r, s) => (o(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
