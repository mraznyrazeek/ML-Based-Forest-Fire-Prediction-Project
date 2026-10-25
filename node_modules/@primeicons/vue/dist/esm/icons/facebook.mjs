import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { facebook as p } from "@primeicons/core/facebook";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "Facebook",
  inheritAttrs: !1,
  __name: "facebook",
  setup(f) {
    const { Icon: o } = s(p);
    return (e, i) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
