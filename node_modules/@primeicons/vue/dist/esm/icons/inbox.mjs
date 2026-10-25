import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { inbox as m } from "@primeicons/core/inbox";
import { createIcon as p } from "@primeicons/vue/core";
const x = /* @__PURE__ */ r({
  name: "Inbox",
  inheritAttrs: !1,
  __name: "inbox",
  setup(s) {
    const { Icon: o } = p(m);
    return (e, f) => (n(), t(a(o), c(i(e.$attrs)), null, 16));
  }
});
export {
  x as default
};
