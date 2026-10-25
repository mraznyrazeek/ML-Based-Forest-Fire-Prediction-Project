import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { arrowCircleLeft as f } from "@primeicons/core/arrow-circle-left";
import { createIcon as l } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "ArrowCircleLeft",
  inheritAttrs: !1,
  __name: "arrow-circle-left",
  setup(m) {
    const { Icon: r } = l(f);
    return (e, p) => (t(), n(c(r), a(i(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
