import { defineComponent as r, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { addressBook as m } from "@primeicons/core/address-book";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ r({
  name: "AddressBook",
  inheritAttrs: !1,
  __name: "address-book",
  setup(d) {
    const { Icon: o } = p(m);
    return (e, i) => (t(), n(s(o), a(c(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
