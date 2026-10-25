import { defineComponent as o, openBlock as t, createBlock as n, unref as i, normalizeProps as a, guardReactiveProps as c } from "vue";
import { wifi as f } from "@primeicons/core/wifi";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Wifi",
  inheritAttrs: !1,
  __name: "wifi",
  setup(p) {
    const { Icon: e } = m(f);
    return (r, s) => (t(), n(i(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
