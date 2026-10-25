import { defineComponent as n, openBlock as o, createBlock as t, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { venus as m } from "@primeicons/core/venus";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Venus",
  inheritAttrs: !1,
  __name: "venus",
  setup(u) {
    const { Icon: e } = p(m);
    return (r, i) => (o(), t(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
