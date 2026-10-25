import { defineComponent as r, openBlock as t, createBlock as n, unref as m, normalizeProps as a, guardReactiveProps as c } from "vue";
import { home as p } from "@primeicons/core/home";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "Home",
  inheritAttrs: !1,
  __name: "home",
  setup(i) {
    const { Icon: e } = s(p);
    return (o, f) => (t(), n(m(e), a(c(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
