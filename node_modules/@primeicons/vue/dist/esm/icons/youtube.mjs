import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as u, guardReactiveProps as c } from "vue";
import { youtube as m } from "@primeicons/core/youtube";
import { createIcon as p } from "@primeicons/vue/core";
const b = /* @__PURE__ */ r({
  name: "Youtube",
  inheritAttrs: !1,
  __name: "youtube",
  setup(s) {
    const { Icon: e } = p(m);
    return (o, i) => (t(), n(a(e), u(c(o.$attrs)), null, 16));
  }
});
export {
  b as default
};
