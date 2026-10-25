import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { replay as m } from "@primeicons/core/replay";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Replay",
  inheritAttrs: !1,
  __name: "replay",
  setup(l) {
    const { Icon: e } = s(m);
    return (r, i) => (t(), n(a(e), p(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
