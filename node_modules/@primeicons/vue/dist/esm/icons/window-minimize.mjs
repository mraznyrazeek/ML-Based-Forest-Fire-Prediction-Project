import { defineComponent as o, openBlock as r, createBlock as i, unref as t, normalizeProps as m, guardReactiveProps as a } from "vue";
import { windowMinimize as c } from "@primeicons/core/window-minimize";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "WindowMinimize",
  inheritAttrs: !1,
  __name: "window-minimize",
  setup(s) {
    const { Icon: e } = p(c);
    return (n, f) => (r(), i(t(e), m(a(n.$attrs)), null, 16));
  }
});
export {
  d as default
};
