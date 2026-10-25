import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { blockQuote as p } from "@primeicons/core/block-quote";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "BlockQuote",
  inheritAttrs: !1,
  __name: "block-quote",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, u) => (t(), n(c(o), a(m(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
