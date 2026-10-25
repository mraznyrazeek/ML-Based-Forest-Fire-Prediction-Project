import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as c } from "vue";
import { image as i } from "@primeicons/core/image";
import { createIcon as p } from "@primeicons/vue/core";
const g = /* @__PURE__ */ o({
  name: "Image",
  inheritAttrs: !1,
  __name: "image",
  setup(s) {
    const { Icon: e } = p(i);
    return (r, f) => (t(), n(a(e), m(c(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
