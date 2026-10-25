import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { link as m } from "@primeicons/core/link";
import { createIcon as p } from "@primeicons/vue/core";
const k = /* @__PURE__ */ n({
  name: "Link",
  inheritAttrs: !1,
  __name: "link",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (o(), t(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
