import { defineComponent as o, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { grip as i } from "@primeicons/core/grip";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Grip",
  inheritAttrs: !1,
  __name: "grip",
  setup(s) {
    const { Icon: r } = m(i);
    return (e, f) => (t(), n(p(r), a(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
