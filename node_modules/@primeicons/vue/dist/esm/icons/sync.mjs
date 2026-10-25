import { defineComponent as n, openBlock as o, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as s } from "vue";
import { sync as m } from "@primeicons/core/sync";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Sync",
  inheritAttrs: !1,
  __name: "sync",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, f) => (o(), t(c(e), a(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
