import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as c } from "vue";
import { mobile as i } from "@primeicons/core/mobile";
import { createIcon as p } from "@primeicons/vue/core";
const b = /* @__PURE__ */ r({
  name: "Mobile",
  inheritAttrs: !1,
  __name: "mobile",
  setup(s) {
    const { Icon: e } = p(i);
    return (o, l) => (t(), n(a(e), m(c(o.$attrs)), null, 16));
  }
});
export {
  b as default
};
