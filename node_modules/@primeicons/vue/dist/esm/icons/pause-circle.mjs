import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as s } from "vue";
import { pauseCircle as p } from "@primeicons/core/pause-circle";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "PauseCircle",
  inheritAttrs: !1,
  __name: "pause-circle",
  setup(m) {
    const { Icon: e } = i(p);
    return (r, l) => (t(), n(a(e), c(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
