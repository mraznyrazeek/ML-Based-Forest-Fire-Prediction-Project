import { defineComponent as t, openBlock as o, createBlock as n, unref as c, normalizeProps as i, guardReactiveProps as m } from "vue";
import { timesCircle as s } from "@primeicons/core/times-circle";
import { createIcon as a } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "TimesCircle",
  inheritAttrs: !1,
  __name: "times-circle",
  setup(p) {
    const { Icon: e } = a(s);
    return (r, l) => (o(), n(c(e), i(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
