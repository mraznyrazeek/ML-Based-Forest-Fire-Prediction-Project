import { defineComponent as e, openBlock as n, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { android as m } from "@primeicons/core/android";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ e({
  name: "Android",
  inheritAttrs: !1,
  __name: "android",
  setup(s) {
    const { Icon: r } = p(m);
    return (o, d) => (n(), t(a(r), c(i(o.$attrs)), null, 16));
  }
});
export {
  _ as default
};
