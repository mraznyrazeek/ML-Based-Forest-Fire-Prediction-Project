import { defineComponent as o, openBlock as p, createBlock as t, unref as n, normalizeProps as a, guardReactiveProps as c } from "vue";
import { paperclip as i } from "@primeicons/core/paperclip";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Paperclip",
  inheritAttrs: !1,
  __name: "paperclip",
  setup(s) {
    const { Icon: e } = m(i);
    return (r, l) => (p(), t(n(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
