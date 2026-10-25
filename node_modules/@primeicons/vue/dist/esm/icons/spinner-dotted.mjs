import { defineComponent as t, openBlock as n, createBlock as o, unref as p, normalizeProps as a, guardReactiveProps as s } from "vue";
import { spinnerDotted as c } from "@primeicons/core/spinner-dotted";
import { createIcon as i } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ t({
  name: "SpinnerDotted",
  inheritAttrs: !1,
  __name: "spinner-dotted",
  setup(m) {
    const { Icon: e } = i(c);
    return (r, f) => (n(), o(p(e), a(s(r.$attrs)), null, 16));
  }
});
export {
  _ as default
};
