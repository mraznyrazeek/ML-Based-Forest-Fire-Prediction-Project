import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as p } from "vue";
import { pause as c } from "@primeicons/core/pause";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Pause",
  inheritAttrs: !1,
  __name: "pause",
  setup(u) {
    const { Icon: e } = m(c);
    return (r, i) => (t(), n(a(e), s(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
