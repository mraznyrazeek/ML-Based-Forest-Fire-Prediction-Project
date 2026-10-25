import { defineComponent as r, openBlock as t, createBlock as n, unref as m, normalizeProps as a, guardReactiveProps as c } from "vue";
import { vimeo as i } from "@primeicons/core/vimeo";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Vimeo",
  inheritAttrs: !1,
  __name: "vimeo",
  setup(s) {
    const { Icon: e } = p(i);
    return (o, f) => (t(), n(m(e), a(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
