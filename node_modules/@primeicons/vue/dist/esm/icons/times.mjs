import { defineComponent as t, openBlock as o, createBlock as n, unref as m, normalizeProps as s, guardReactiveProps as a } from "vue";
import { times as c } from "@primeicons/core/times";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Times",
  inheritAttrs: !1,
  __name: "times",
  setup(p) {
    const { Icon: e } = i(c);
    return (r, f) => (o(), n(m(e), s(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
