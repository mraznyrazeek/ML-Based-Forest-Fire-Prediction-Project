import { defineComponent as r, openBlock as t, createBlock as n, unref as p, normalizeProps as s, guardReactiveProps as a } from "vue";
import { desktop as c } from "@primeicons/core/desktop";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Desktop",
  inheritAttrs: !1,
  __name: "desktop",
  setup(i) {
    const { Icon: e } = m(c);
    return (o, f) => (t(), n(p(e), s(a(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
