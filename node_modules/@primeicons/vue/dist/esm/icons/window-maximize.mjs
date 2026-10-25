import { defineComponent as r, openBlock as n, createBlock as t, unref as i, normalizeProps as a, guardReactiveProps as m } from "vue";
import { windowMaximize as c } from "@primeicons/core/window-maximize";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "WindowMaximize",
  inheritAttrs: !1,
  __name: "window-maximize",
  setup(s) {
    const { Icon: e } = p(c);
    return (o, f) => (n(), t(i(e), a(m(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
