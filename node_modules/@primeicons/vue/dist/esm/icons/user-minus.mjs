import { defineComponent as n, openBlock as o, createBlock as t, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { userMinus as i } from "@primeicons/core/user-minus";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "UserMinus",
  inheritAttrs: !1,
  __name: "user-minus",
  setup(u) {
    const { Icon: e } = m(i);
    return (r, p) => (o(), t(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
