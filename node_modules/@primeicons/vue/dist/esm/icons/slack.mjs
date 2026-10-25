import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as s } from "vue";
import { slack as m } from "@primeicons/core/slack";
import { createIcon as p } from "@primeicons/vue/core";
const k = /* @__PURE__ */ o({
  name: "Slack",
  inheritAttrs: !1,
  __name: "slack",
  setup(l) {
    const { Icon: e } = p(m);
    return (r, i) => (t(), n(a(e), c(s(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
