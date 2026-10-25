import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as l } from "vue";
import { bullseye as c } from "@primeicons/core/bullseye";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Bullseye",
  inheritAttrs: !1,
  __name: "bullseye",
  setup(p) {
    const { Icon: e } = m(c);
    return (r, u) => (t(), n(s(e), a(l(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
