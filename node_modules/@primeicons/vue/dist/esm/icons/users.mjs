import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { users as m } from "@primeicons/core/users";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Users",
  inheritAttrs: !1,
  __name: "users",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, u) => (t(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
