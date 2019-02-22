import PFElement from "../pfelement/pfelement.js";

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get schemaUrl() {
    return "pfe-navigation-item.json";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  static get icons() {
      return {
          bento: "<svg width='19px' height='19px' viewBox='0 0 19 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Icon' fill='#FFFFFF'><rect id='Rectangle' x='14' y='14' width='5' height='5'></rect><rect id='Rectangle' x='7' y='14' width='5' height='5'></rect><rect id='Rectangle' x='0' y='14' width='5' height='5'></rect><rect id='Rectangle' x='14' y='7' width='5' height='5'></rect><rect id='Rectangle' x='7' y='7' width='5' height='5'></rect><rect id='Rectangle' x='0' y='7' width='5' height='5'></rect><rect id='Rectangle' x='14' y='0' width='5' height='5'></rect><rect id='Rectangle' x='7' y='0' width='5' height='5'></rect><rect id='Rectangle' x='0' y='0' width='5' height='5'></rect></g></g></svg>",
          globe: "",
          menu: "",
          search: "",
          user: ""
      }
  }

  get expanded() {
    return this.tray.hasAttribute("aria-expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.classList.add("expanded");

      if (this.trigger) {
        this.trigger.setAttribute("aria-expanded", true);
      }

      if (this.tray) {
        this.tray.classList.remove("hide");
        this.tray.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this.trigger) {
        this.trigger.removeAttribute("aria-expanded");
      }

      if (this.tray) {
        this.tray.classList.add("hide");
        this.tray.removeAttribute("aria-expanded");
      }
    }
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationItem, { type: PfeNavigationItem.PfeType });
    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.trigger = this.querySelector('a[slot="pfe-navigation-item--trigger"]')
    this.lightDomTray = this.querySelector('[slot="pfe-navigation-item--tray"]');
    this.tray = this.shadowRoot.querySelector(".pfe-navigation-item--wrapper");
    this.expanded = false;

    if (!this.trigger.hasAttribute("role")) {
      this.trigger.setAttribute("role", "button");
    }

    if (this.lightDomTray) {
      this.lightDomTray.removeAttribute("hidden");
    }

    this.addEventListener("click", this._clickHandler);
    this.addEventListener("keydown", this._keydownHandler);
  }

  _clickHandler(event) {
    event.preventDefault();

    if (event.target === this.trigger) {
      this.expanded = !this.expanded;

      this.dispatchEvent(
        new CustomEvent(`${PfeNavigationItem.tag}:active`, {
          detail: { expanded: this.expanded },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  // Update the icon attribute and return the SVG
  _updateIcon(attr, oldValue, newValue){
    switch (newValue.toLowerCase()) {
      case "search":
        // Get the search SVG
        return this.icon.search;
      case "globe":
        // Get the globe SVG
        return this.icon.globe;
      case "user":
        // Get the person SVG
        return this.icon.user;
      case "bento":
        // Get the person SVG
        return this.icon.bento;
      default:
        // @TODO is there a default icon?
    }
  }
}

PFElement.create(PfeNavigationItem);

export default PfeNavigationItem;
