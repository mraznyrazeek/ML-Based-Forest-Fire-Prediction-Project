import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as c, guardReactiveProps as m } from "vue";
import { compress as p } from "@primeicons/core/compress";
import { createIcon as a } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Compress",
  inheritAttrs: !1,
  __name: "compress",
  setup(i) {
    const { Icon: e } = a(p);
    return (r, f) => (t(), n(s(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
