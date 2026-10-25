import { defineComponent as r, openBlock as t, createBlock as n, unref as m, normalizeProps as p, guardReactiveProps as a } from "vue";
import { volumeUp as c } from "@primeicons/core/volume-up";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "VolumeUp",
  inheritAttrs: !1,
  __name: "volume-up",
  setup(u) {
    const { Icon: e } = s(c);
    return (o, l) => (t(), n(m(e), p(a(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
