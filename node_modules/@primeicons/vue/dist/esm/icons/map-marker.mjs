import { defineComponent as o, openBlock as a, createBlock as t, unref as n, normalizeProps as m, guardReactiveProps as p } from "vue";
import { mapMarker as c } from "@primeicons/core/map-marker";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ o({
  name: "MapMarker",
  inheritAttrs: !1,
  __name: "map-marker",
  setup(i) {
    const { Icon: r } = s(c);
    return (e, f) => (a(), t(n(r), m(p(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
