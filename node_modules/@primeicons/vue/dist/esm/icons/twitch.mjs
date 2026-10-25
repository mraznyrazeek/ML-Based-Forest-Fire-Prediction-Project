import { defineComponent as r, openBlock as o, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { twitch as m } from "@primeicons/core/twitch";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "Twitch",
  inheritAttrs: !1,
  __name: "twitch",
  setup(s) {
    const { Icon: t } = p(m);
    return (e, f) => (o(), n(c(t), a(i(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
