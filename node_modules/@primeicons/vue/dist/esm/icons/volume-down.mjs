import { defineComponent as r, openBlock as n, createBlock as t, unref as m, normalizeProps as a, guardReactiveProps as c } from "vue";
import { volumeDown as p } from "@primeicons/core/volume-down";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "VolumeDown",
  inheritAttrs: !1,
  __name: "volume-down",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, u) => (n(), t(m(o), a(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
