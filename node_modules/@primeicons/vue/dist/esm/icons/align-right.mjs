import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as i, guardReactiveProps as c } from "vue";
import { alignRight as m } from "@primeicons/core/align-right";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ t({
  name: "AlignRight",
  inheritAttrs: !1,
  __name: "align-right",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, l) => (n(), o(a(r), i(c(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
