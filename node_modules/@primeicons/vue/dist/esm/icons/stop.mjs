import { defineComponent as r, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as s } from "vue";
import { stop as c } from "@primeicons/core/stop";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Stop",
  inheritAttrs: !1,
  __name: "stop",
  setup(i) {
    const { Icon: o } = m(c);
    return (e, f) => (t(), n(p(o), a(s(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
