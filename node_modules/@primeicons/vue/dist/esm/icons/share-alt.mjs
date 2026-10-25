import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as s, guardReactiveProps as c } from "vue";
import { shareAlt as m } from "@primeicons/core/share-alt";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ShareAlt",
  inheritAttrs: !1,
  __name: "share-alt",
  setup(l) {
    const { Icon: e } = p(m);
    return (r, i) => (o(), a(n(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
