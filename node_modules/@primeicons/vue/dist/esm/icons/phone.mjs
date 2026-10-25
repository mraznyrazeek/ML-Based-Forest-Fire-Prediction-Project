import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { phone as m } from "@primeicons/core/phone";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "Phone",
  inheritAttrs: !1,
  __name: "phone",
  setup(i) {
    const { Icon: e } = s(m);
    return (o, f) => (n(), t(a(e), p(c(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
