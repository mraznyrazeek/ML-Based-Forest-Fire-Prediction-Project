import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { signOut as i } from "@primeicons/core/sign-out";
import { createIcon as m } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "SignOut",
  inheritAttrs: !1,
  __name: "sign-out",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, u) => (o(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
