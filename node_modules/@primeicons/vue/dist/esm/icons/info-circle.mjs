import { defineComponent as o, openBlock as n, createBlock as t, unref as c, normalizeProps as i, guardReactiveProps as a } from "vue";
import { infoCircle as f } from "@primeicons/core/info-circle";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "InfoCircle",
  inheritAttrs: !1,
  __name: "info-circle",
  setup(p) {
    const { Icon: e } = m(f);
    return (r, s) => (n(), t(c(e), i(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
