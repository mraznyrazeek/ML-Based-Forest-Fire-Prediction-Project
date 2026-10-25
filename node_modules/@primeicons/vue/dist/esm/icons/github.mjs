import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { github as m } from "@primeicons/core/github";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "Github",
  inheritAttrs: !1,
  __name: "github",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, u) => (o(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
