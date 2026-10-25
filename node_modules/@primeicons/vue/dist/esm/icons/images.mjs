import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as s } from "vue";
import { images as c } from "@primeicons/core/images";
import { createIcon as i } from "@primeicons/vue/core";
const g = /* @__PURE__ */ o({
  name: "Images",
  inheritAttrs: !1,
  __name: "images",
  setup(p) {
    const { Icon: e } = i(c);
    return (r, f) => (t(), n(a(e), m(s(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
