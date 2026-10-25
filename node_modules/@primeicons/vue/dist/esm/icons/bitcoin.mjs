import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as i, guardReactiveProps as a } from "vue";
import { bitcoin as m } from "@primeicons/core/bitcoin";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Bitcoin",
  inheritAttrs: !1,
  __name: "bitcoin",
  setup(s) {
    const { Icon: o } = p(m);
    return (e, f) => (t(), n(c(o), i(a(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
