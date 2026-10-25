import { defineComponent as o, openBlock as a, createBlock as t, unref as n, normalizeProps as c, guardReactiveProps as m } from "vue";
import { backward as p } from "@primeicons/core/backward";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Backward",
  inheritAttrs: !1,
  __name: "backward",
  setup(i) {
    const { Icon: r } = s(p);
    return (e, f) => (a(), t(n(r), c(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
