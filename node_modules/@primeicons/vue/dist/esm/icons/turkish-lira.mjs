import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as i, guardReactiveProps as s } from "vue";
import { turkishLira as c } from "@primeicons/core/turkish-lira";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "TurkishLira",
  inheritAttrs: !1,
  __name: "turkish-lira",
  setup(p) {
    const { Icon: r } = m(c);
    return (e, u) => (o(), n(a(r), i(s(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
