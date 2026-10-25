import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { arrowUpLeft as f } from "@primeicons/core/arrow-up-left";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "ArrowUpLeft",
  inheritAttrs: !1,
  __name: "arrow-up-left",
  setup(s) {
    const { Icon: r } = m(f);
    return (e, i) => (t(), n(a(r), p(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
