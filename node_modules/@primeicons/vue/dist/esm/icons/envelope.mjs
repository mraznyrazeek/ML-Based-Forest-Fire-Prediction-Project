import { defineComponent as r, openBlock as n, createBlock as t, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { envelope as m } from "@primeicons/core/envelope";
import { createIcon as s } from "@primeicons/vue/core";
const v = /* @__PURE__ */ r({
  name: "Envelope",
  inheritAttrs: !1,
  __name: "envelope",
  setup(l) {
    const { Icon: e } = s(m);
    return (o, i) => (n(), t(p(e), a(c(o.$attrs)), null, 16));
  }
});
export {
  v as default
};
