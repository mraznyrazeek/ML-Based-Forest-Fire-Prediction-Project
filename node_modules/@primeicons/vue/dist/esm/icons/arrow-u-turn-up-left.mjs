import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { arrowUTurnUpLeft as u } from "@primeicons/core/arrow-u-turn-up-left";
import { createIcon as f } from "@primeicons/vue/core";
const U = /* @__PURE__ */ o({
  name: "ArrowUTurnUpLeft",
  inheritAttrs: !1,
  __name: "arrow-u-turn-up-left",
  setup(m) {
    const { Icon: r } = f(u);
    return (e, s) => (t(), n(a(r), p(c(e.$attrs)), null, 16));
  }
});
export {
  U as default
};
