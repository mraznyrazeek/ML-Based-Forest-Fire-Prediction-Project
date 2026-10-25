import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as s } from "vue";
import { headphones as c } from "@primeicons/core/headphones";
import { createIcon as m } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ r({
  name: "Headphones",
  inheritAttrs: !1,
  __name: "headphones",
  setup(i) {
    const { Icon: e } = m(c);
    return (o, f) => (n(), t(a(e), p(s(o.$attrs)), null, 16));
  }
});
export {
  _ as default
};
