import { defineComponent as t, openBlock as o, createBlock as n, unref as c, normalizeProps as i, guardReactiveProps as a } from "vue";
import { directionsAlt as s } from "@primeicons/core/directions-alt";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "DirectionsAlt",
  inheritAttrs: !1,
  __name: "directions-alt",
  setup(p) {
    const { Icon: e } = m(s);
    return (r, l) => (o(), n(c(e), i(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
