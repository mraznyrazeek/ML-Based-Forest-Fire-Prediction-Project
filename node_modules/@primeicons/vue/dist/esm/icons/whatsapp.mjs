import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as p, guardReactiveProps as s } from "vue";
import { whatsapp as c } from "@primeicons/core/whatsapp";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "Whatsapp",
  inheritAttrs: !1,
  __name: "whatsapp",
  setup(i) {
    const { Icon: e } = m(c);
    return (r, f) => (o(), a(n(e), p(s(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
