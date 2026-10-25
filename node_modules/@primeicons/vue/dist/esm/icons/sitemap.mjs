import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as p } from "vue";
import { sitemap as s } from "@primeicons/core/sitemap";
import { createIcon as c } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Sitemap",
  inheritAttrs: !1,
  __name: "sitemap",
  setup(i) {
    const { Icon: e } = c(s);
    return (r, f) => (o(), n(a(e), m(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
