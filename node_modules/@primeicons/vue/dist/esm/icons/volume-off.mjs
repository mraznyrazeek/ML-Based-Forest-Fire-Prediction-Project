import { defineComponent as r, openBlock as t, createBlock as n, unref as f, normalizeProps as m, guardReactiveProps as a } from "vue";
import { volumeOff as c } from "@primeicons/core/volume-off";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "VolumeOff",
  inheritAttrs: !1,
  __name: "volume-off",
  setup(s) {
    const { Icon: e } = p(c);
    return (o, l) => (t(), n(f(e), m(a(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
