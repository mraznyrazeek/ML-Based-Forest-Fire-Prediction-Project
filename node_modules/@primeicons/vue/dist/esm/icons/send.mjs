import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { send as m } from "@primeicons/core/send";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Send",
  inheritAttrs: !1,
  __name: "send",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, f) => (o(), t(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
