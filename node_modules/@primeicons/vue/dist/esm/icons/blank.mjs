import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { blank as p } from "@primeicons/core/blank";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ n({
  name: "Blank",
  inheritAttrs: !1,
  __name: "blank",
  setup(l) {
    const { Icon: e } = s(p);
    return (r, i) => (o(), t(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
