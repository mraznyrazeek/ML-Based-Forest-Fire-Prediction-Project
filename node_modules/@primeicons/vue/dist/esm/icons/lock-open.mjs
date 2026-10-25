import { defineComponent as r, openBlock as n, createBlock as t, unref as c, normalizeProps as p, guardReactiveProps as a } from "vue";
import { lockOpen as m } from "@primeicons/core/lock-open";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "LockOpen",
  inheritAttrs: !1,
  __name: "lock-open",
  setup(i) {
    const { Icon: e } = s(m);
    return (o, l) => (n(), t(c(e), p(a(o.$attrs)), null, 16));
  }
});
export {
  k as default
};
