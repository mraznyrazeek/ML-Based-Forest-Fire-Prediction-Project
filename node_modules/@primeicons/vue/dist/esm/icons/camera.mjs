import { defineComponent as o, openBlock as a, createBlock as t, unref as n, normalizeProps as c, guardReactiveProps as m } from "vue";
import { camera as p } from "@primeicons/core/camera";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Camera",
  inheritAttrs: !1,
  __name: "camera",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (a(), t(n(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
