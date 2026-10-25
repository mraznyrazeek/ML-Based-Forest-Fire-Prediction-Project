import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { rectangleXmark as p } from "@primeicons/core/rectangle-xmark";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ t({
  name: "RectangleXmark",
  inheritAttrs: !1,
  __name: "rectangle-xmark",
  setup(l) {
    const { Icon: e } = s(p);
    return (r, i) => (n(), o(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
