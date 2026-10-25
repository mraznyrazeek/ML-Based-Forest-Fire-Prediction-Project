import { defineComponent as r, openBlock as n, createBlock as t, unref as c, normalizeProps as p, guardReactiveProps as a } from "vue";
import { microphone as m } from "@primeicons/core/microphone";
import { createIcon as i } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "Microphone",
  inheritAttrs: !1,
  __name: "microphone",
  setup(s) {
    const { Icon: o } = i(m);
    return (e, f) => (n(), t(c(o), p(a(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
