import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { user as m } from "@primeicons/core/user";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "User",
  inheritAttrs: !1,
  __name: "user",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, u) => (t(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
