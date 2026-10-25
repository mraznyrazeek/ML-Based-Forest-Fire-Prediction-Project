import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as f } from "vue";
import { arrowLeft as m } from "@primeicons/core/arrow-left";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "ArrowLeft",
  inheritAttrs: !1,
  __name: "arrow-left",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, i) => (t(), n(a(r), c(f(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
