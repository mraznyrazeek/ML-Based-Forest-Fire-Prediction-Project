import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { fileArrowUp as i } from "@primeicons/core/file-arrow-up";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "FileArrowUp",
  inheritAttrs: !1,
  __name: "file-arrow-up",
  setup(s) {
    const { Icon: r } = m(i);
    return (e, f) => (t(), n(a(r), p(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
