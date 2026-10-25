import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { upload as m } from "@primeicons/core/upload";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Upload",
  inheritAttrs: !1,
  __name: "upload",
  setup(l) {
    const { Icon: o } = s(m);
    return (e, i) => (t(), n(a(o), p(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
