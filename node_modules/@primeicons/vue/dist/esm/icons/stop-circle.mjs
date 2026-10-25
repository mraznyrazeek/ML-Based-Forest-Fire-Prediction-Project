import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as p, guardReactiveProps as a } from "vue";
import { stopCircle as s } from "@primeicons/core/stop-circle";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "StopCircle",
  inheritAttrs: !1,
  __name: "stop-circle",
  setup(m) {
    const { Icon: e } = i(s);
    return (r, l) => (t(), n(c(e), p(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
