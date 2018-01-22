!(function(e, n) {
  if ("function" == typeof define && define.amd)
    define(["../rhelement/rhelement.compiled.js"], n);
  else if ("undefined" != typeof exports)
    n(require("../rhelement/rhelement.compiled.js"));
  else {
    n(e.rhelementCompiled), (e.cpAccordionPanel = {});
  }
})(this, function(e) {
  "use strict";
  var n = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(e),
    t = (function() {
      function e(e, n) {
        for (var t = 0; t < n.length; t++) {
          var o = n[t];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
        }
      }
      return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
      };
    })(),
    o = document.createElement("template");
  o.innerHTML =
    '\n<style>*, *::before, *:after {\n  box-sizing: var(--box-sizing, border-box); }\n\n:host {\n  display: none;\n  overflow: hidden;\n  background: white;\n  will-change: height; }\n\n:host([expanded]) {\n  display: block; }\n\n:host(.animating) {\n  display: block;\n  transition: height 0.3s ease-in-out; }\n\n.container {\n  border: 2px solid #f7f7f7;\n  border-top: none;\n  padding: 20px;\n  padding-top: 5px; }</style>\n<div tabindex="-1" role="tabpanel">\n  <div class="container">\n    <slot></slot>\n  </div>\n</div>\n';
  var r = (function(e) {
    function r() {
      return (
        (function(e, n) {
          if (!(e instanceof n))
            throw new TypeError("Cannot call a class as a function");
        })(this, r),
        (function(e, n) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !n || ("object" != typeof n && "function" != typeof n) ? e : n;
        })(
          this,
          (r.__proto__ || Object.getPrototypeOf(r)).call(
            this,
            "cp-accordion-panel",
            o
          )
        )
      );
    }
    return (
      (function(e, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      })(r, n.default),
      t(r, [
        {
          key: "expanded",
          get: function() {
            return this.hasAttribute("expanded");
          },
          set: function(e) {
            Boolean(e)
              ? this.setAttribute("expanded", "")
              : this.removeAttribute("expanded");
          }
        }
      ]),
      r
    );
  })();
  window.customElements.define("cp-accordion-panel", r);
});