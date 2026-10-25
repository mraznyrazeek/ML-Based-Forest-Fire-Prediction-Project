import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { undo as p } from "@primeicons/core/undo";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Undo",
  inheritAttrs: !1,
  __name: "undo",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, u) => (n(), t(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
