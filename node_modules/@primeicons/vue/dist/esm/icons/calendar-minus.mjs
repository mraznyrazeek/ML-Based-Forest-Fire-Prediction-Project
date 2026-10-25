import { defineComponent as n, openBlock as o, createBlock as a, unref as t, normalizeProps as c, guardReactiveProps as s } from "vue";
import { calendarMinus as i } from "@primeicons/core/calendar-minus";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "CalendarMinus",
  inheritAttrs: !1,
  __name: "calendar-minus",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, l) => (o(), a(t(e), c(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
