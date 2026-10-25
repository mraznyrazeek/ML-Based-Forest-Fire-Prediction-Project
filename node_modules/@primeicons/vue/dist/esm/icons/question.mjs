import { defineComponent as r, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { question as i } from "@primeicons/core/question";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Question",
  inheritAttrs: !1,
  __name: "question",
  setup(p) {
    const { Icon: e } = m(i);
    return (o, u) => (t(), n(s(e), a(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
