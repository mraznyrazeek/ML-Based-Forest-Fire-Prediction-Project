import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { code as p } from "@primeicons/core/code";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Code",
  inheritAttrs: !1,
  __name: "code",
  setup(i) {
    const { Icon: e } = s(p);
    return (o, f) => (t(), n(c(e), a(m(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
