import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as c } from "vue";
import { telegram as p } from "@primeicons/core/telegram";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "Telegram",
  inheritAttrs: !1,
  __name: "telegram",
  setup(l) {
    const { Icon: e } = s(p);
    return (r, i) => (o(), n(a(e), m(c(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
