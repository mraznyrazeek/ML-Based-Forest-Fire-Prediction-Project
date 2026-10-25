import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { qrcode as p } from "@primeicons/core/qrcode";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Qrcode",
  inheritAttrs: !1,
  __name: "qrcode",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (t(), n(c(e), a(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
