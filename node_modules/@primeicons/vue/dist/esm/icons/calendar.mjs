import { defineComponent as n, openBlock as o, createBlock as a, unref as t, normalizeProps as c, guardReactiveProps as m } from "vue";
import { calendar as p } from "@primeicons/core/calendar";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Calendar",
  inheritAttrs: !1,
  __name: "calendar",
  setup(l) {
    const { Icon: e } = s(p);
    return (r, i) => (o(), a(t(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
