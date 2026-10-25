import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as m, guardReactiveProps as s } from "vue";
import { objectsColumn as a } from "@primeicons/core/objects-column";
import { createIcon as p } from "@primeicons/vue/core";
const b = /* @__PURE__ */ r({
  name: "ObjectsColumn",
  inheritAttrs: !1,
  __name: "objects-column",
  setup(l) {
    const { Icon: e } = p(a);
    return (o, u) => (t(), n(c(e), m(s(o.$attrs)), null, 16));
  }
});
export {
  b as default
};
