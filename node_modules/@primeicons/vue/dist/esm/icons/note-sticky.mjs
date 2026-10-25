import { defineComponent as o, openBlock as r, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { noteSticky as s } from "@primeicons/core/note-sticky";
import { createIcon as m } from "@primeicons/vue/core";
const k = /* @__PURE__ */ o({
  name: "NoteSticky",
  inheritAttrs: !1,
  __name: "note-sticky",
  setup(p) {
    const { Icon: e } = m(s);
    return (t, f) => (r(), n(c(e), a(i(t.$attrs)), null, 16));
  }
});
export {
  k as default
};
