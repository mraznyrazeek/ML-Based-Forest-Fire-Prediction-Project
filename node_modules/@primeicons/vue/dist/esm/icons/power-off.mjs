import { defineComponent as o, openBlock as t, createBlock as n, unref as f, normalizeProps as a, guardReactiveProps as p } from "vue";
import { powerOff as c } from "@primeicons/core/power-off";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "PowerOff",
  inheritAttrs: !1,
  __name: "power-off",
  setup(s) {
    const { Icon: e } = m(c);
    return (r, i) => (t(), n(f(e), a(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
