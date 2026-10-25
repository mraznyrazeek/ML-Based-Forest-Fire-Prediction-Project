import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { faceSmile as i } from "@primeicons/core/face-smile";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "FaceSmile",
  inheritAttrs: !1,
  __name: "face-smile",
  setup(p) {
    const { Icon: e } = s(i);
    return (r, f) => (t(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
