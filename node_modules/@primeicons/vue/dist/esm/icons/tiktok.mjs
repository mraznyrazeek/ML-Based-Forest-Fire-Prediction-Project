import { defineComponent as e, openBlock as r, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { tiktok as m } from "@primeicons/core/tiktok";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ e({
  name: "Tiktok",
  inheritAttrs: !1,
  __name: "tiktok",
  setup(s) {
    const { Icon: t } = p(m);
    return (o, f) => (r(), n(a(t), c(i(o.$attrs)), null, 16));
  }
});
export {
  _ as default
};
