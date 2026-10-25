import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { globe as p } from "@primeicons/core/globe";
import { createIcon as s } from "@primeicons/vue/core";
const b = /* @__PURE__ */ r({
  name: "Globe",
  inheritAttrs: !1,
  __name: "globe",
  setup(l) {
    const { Icon: e } = s(p);
    return (o, i) => (t(), n(a(e), c(m(o.$attrs)), null, 16));
  }
});
export {
  b as default
};
