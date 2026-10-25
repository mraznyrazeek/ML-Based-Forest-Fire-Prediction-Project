import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { arrowRightArrowLeft as f } from "@primeicons/core/arrow-right-arrow-left";
import { createIcon as m } from "@primeicons/vue/core";
const w = /* @__PURE__ */ e({
  name: "ArrowRightArrowLeft",
  inheritAttrs: !1,
  __name: "arrow-right-arrow-left",
  setup(p) {
    const { Icon: r } = m(f);
    return (o, s) => (t(), n(a(r), c(i(o.$attrs)), null, 16));
  }
});
export {
  w as default
};
