import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as i, guardReactiveProps as s } from "vue";
import { questionCircle as a } from "@primeicons/core/question-circle";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "QuestionCircle",
  inheritAttrs: !1,
  __name: "question-circle",
  setup(p) {
    const { Icon: e } = m(a);
    return (r, l) => (t(), n(c(e), i(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
