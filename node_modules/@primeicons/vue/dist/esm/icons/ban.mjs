import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { ban as p } from "@primeicons/core/ban";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Ban",
  inheritAttrs: !1,
  __name: "ban",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (o(), t(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
