import { defineComponent as r, openBlock as o, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { ticket as m } from "@primeicons/core/ticket";
import { createIcon as p } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "Ticket",
  inheritAttrs: !1,
  __name: "ticket",
  setup(s) {
    const { Icon: e } = p(m);
    return (t, f) => (o(), n(c(e), a(i(t.$attrs)), null, 16));
  }
});
export {
  k as default
};
