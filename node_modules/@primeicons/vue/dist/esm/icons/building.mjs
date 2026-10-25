import { defineComponent as n, openBlock as o, createBlock as t, unref as i, normalizeProps as a, guardReactiveProps as c } from "vue";
import { building as m } from "@primeicons/core/building";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Building",
  inheritAttrs: !1,
  __name: "building",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (o(), t(i(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
