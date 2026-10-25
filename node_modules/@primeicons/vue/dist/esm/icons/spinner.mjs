import { defineComponent as n, openBlock as o, createBlock as t, unref as p, normalizeProps as a, guardReactiveProps as s } from "vue";
import { spinner as c } from "@primeicons/core/spinner";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Spinner",
  inheritAttrs: !1,
  __name: "spinner",
  setup(m) {
    const { Icon: e } = i(c);
    return (r, f) => (o(), t(p(e), a(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
