import { defineComponent as o, openBlock as t, createBlock as m, unref as n, normalizeProps as a, guardReactiveProps as c } from "vue";
import { hammer as p } from "@primeicons/core/hammer";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "Hammer",
  inheritAttrs: !1,
  __name: "hammer",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (t(), m(n(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
