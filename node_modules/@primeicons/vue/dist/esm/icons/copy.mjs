import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as p, guardReactiveProps as a } from "vue";
import { copy as m } from "@primeicons/core/copy";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Copy",
  inheritAttrs: !1,
  __name: "copy",
  setup(i) {
    const { Icon: o } = s(m);
    return (e, f) => (t(), n(c(o), p(a(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
