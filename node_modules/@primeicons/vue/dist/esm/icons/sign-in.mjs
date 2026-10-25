import { defineComponent as r, openBlock as o, createBlock as t, unref as a, normalizeProps as i, guardReactiveProps as s } from "vue";
import { signIn as c } from "@primeicons/core/sign-in";
import { createIcon as m } from "@primeicons/vue/core";
const g = /* @__PURE__ */ r({
  name: "SignIn",
  inheritAttrs: !1,
  __name: "sign-in",
  setup(p) {
    const { Icon: n } = m(c);
    return (e, f) => (o(), t(a(n), i(s(e.$attrs)), null, 16));
  }
});
export {
  g as default
};
