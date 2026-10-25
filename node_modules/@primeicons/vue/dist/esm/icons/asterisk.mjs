import { defineComponent as t, openBlock as o, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { asterisk as i } from "@primeicons/core/asterisk";
import { createIcon as m } from "@primeicons/vue/core";
const k = /* @__PURE__ */ t({
  name: "Asterisk",
  inheritAttrs: !1,
  __name: "asterisk",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, f) => (o(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
