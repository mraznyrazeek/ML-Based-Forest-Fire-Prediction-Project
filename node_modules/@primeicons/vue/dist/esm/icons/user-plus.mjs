import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { userPlus as p } from "@primeicons/core/user-plus";
import { createIcon as u } from "@primeicons/vue/core";
const P = /* @__PURE__ */ o({
  name: "UserPlus",
  inheritAttrs: !1,
  __name: "user-plus",
  setup(m) {
    const { Icon: e } = u(p);
    return (r, l) => (t(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  P as default
};
