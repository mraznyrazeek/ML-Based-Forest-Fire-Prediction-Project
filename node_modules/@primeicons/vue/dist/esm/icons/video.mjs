import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { video as m } from "@primeicons/core/video";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Video",
  inheritAttrs: !1,
  __name: "video",
  setup(s) {
    const { Icon: e } = p(m);
    return (o, f) => (t(), n(a(e), c(i(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
