import { defineComponent as r, openBlock as n, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { clone as p } from "@primeicons/core/clone";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Clone",
  inheritAttrs: !1,
  __name: "clone",
  setup(l) {
    const { Icon: e } = s(p);
    return (o, i) => (n(), t(c(e), a(m(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
