import { defineComponent as c, openBlock as o, createBlock as t, unref as n, normalizeProps as a, guardReactiveProps as i } from "vue";
import { checkCircle as m } from "@primeicons/core/check-circle";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ c({
  name: "CheckCircle",
  inheritAttrs: !1,
  __name: "check-circle",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (o(), t(n(e), a(i(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
