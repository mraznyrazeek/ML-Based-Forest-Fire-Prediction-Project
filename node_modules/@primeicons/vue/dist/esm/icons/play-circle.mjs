import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as l } from "vue";
import { playCircle as p } from "@primeicons/core/play-circle";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "PlayCircle",
  inheritAttrs: !1,
  __name: "play-circle",
  setup(m) {
    const { Icon: e } = i(p);
    return (r, s) => (t(), n(a(e), c(l(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
