import { defineComponent as n, openBlock as o, createBlock as a, unref as t, normalizeProps as c, guardReactiveProps as m } from "vue";
import { language as p } from "@primeicons/core/language";
import { createIcon as s } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ n({
  name: "Language",
  inheritAttrs: !1,
  __name: "language",
  setup(u) {
    const { Icon: e } = s(p);
    return (r, i) => (o(), a(t(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  _ as default
};
