import { defineComponent as e, openBlock as t, createBlock as n, unref as c, normalizeProps as s, guardReactiveProps as a } from "vue";
import { discord as i } from "@primeicons/core/discord";
import { createIcon as m } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ e({
  name: "Discord",
  inheritAttrs: !1,
  __name: "discord",
  setup(p) {
    const { Icon: r } = m(i);
    return (o, d) => (t(), n(c(r), s(a(o.$attrs)), null, 16));
  }
});
export {
  _ as default
};
