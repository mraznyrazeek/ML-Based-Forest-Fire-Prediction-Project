import { defineComponent as t, openBlock as e, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { arrowUTurnUpRight as i } from "@primeicons/core/arrow-u-turn-up-right";
import { createIcon as u } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ArrowUTurnUpRight",
  inheritAttrs: !1,
  __name: "arrow-u-turn-up-right",
  setup(m) {
    const { Icon: r } = u(i);
    return (o, s) => (e(), n(a(r), p(c(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
