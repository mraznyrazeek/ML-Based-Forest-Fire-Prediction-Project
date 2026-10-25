import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as m } from "vue";
import { megaphone as c } from "@primeicons/core/megaphone";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "Megaphone",
  inheritAttrs: !1,
  __name: "megaphone",
  setup(i) {
    const { Icon: e } = s(c);
    return (o, f) => (n(), t(a(e), p(m(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
