/* @ds-bundle: {"format":4,"namespace":"KeplerBilserviceDesignSystem_333da5","components":[{"name":"PriceTag","sourcePath":"components/brand/PriceTag.jsx"},{"name":"SectionHeading","sourcePath":"components/brand/SectionHeading.jsx"},{"name":"ServiceCard","sourcePath":"components/brand/ServiceCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/PriceTag.jsx":"60fc7965f423","components/brand/SectionHeading.jsx":"ad7c2f70783b","components/brand/ServiceCard.jsx":"c12c999b59c2","components/core/Badge.jsx":"a058a733eb77","components/core/Button.jsx":"9abd1a2d1607","components/core/Card.jsx":"d0dc201fee22","components/core/Icon.jsx":"f193236420b7","components/core/IconButton.jsx":"d11328bd4c31","components/core/Logo.jsx":"a60fdb307b40","components/core/Tag.jsx":"aa600bddf480","components/feedback/Dialog.jsx":"760c81ca3172","components/feedback/Toast.jsx":"69d5f1b84c43","components/feedback/Tooltip.jsx":"62bcc01c3aa8","components/forms/Checkbox.jsx":"1c3bf747757e","components/forms/Input.jsx":"cdabea14b864","components/forms/Radio.jsx":"0fc9032e59b3","components/forms/Select.jsx":"9e537b1e7f6e","components/forms/Switch.jsx":"d5c431c02e3d","components/navigation/Tabs.jsx":"c4cc6ebba4d6","ui_kits/app/Phone.jsx":"f9089470d6a6","ui_kits/app/Screens.jsx":"aadd2c80d1a5","ui_kits/dashboard/Dashboard.jsx":"4de765c0f9b0","ui_kits/docs/Docs.jsx":"2efef847044a","ui_kits/website/Chrome.jsx":"f16b70beae03","ui_kits/website/Contact.jsx":"01cdc71794af","ui_kits/website/Home.jsx":"80852ecad1b0","ui_kits/website/ServiceDetail.jsx":"13fce072edbd","ui_kits/website/Services.jsx":"b8c10279e425"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KeplerBilserviceDesignSystem_333da5 = window.KeplerBilserviceDesignSystem_333da5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PriceTag({
  from,
  was,
  now,
  free,
  size = 'md',
  style,
  ...rest
}) {
  const fs = {
    sm: 'var(--fs-lg)',
    md: 'var(--fs-2xl)',
    lg: 'var(--fs-3xl)'
  }[size];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'baseline',
      flexWrap: 'wrap',
      gap: 8,
      flexShrink: 0,
      fontFamily: 'var(--font-display)',
      letterSpacing: 'var(--ls-display)',
      ...style
    }
  }, rest), free ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-black)',
      fontSize: fs,
      color: 'var(--red-500)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, "Gratis") : /*#__PURE__*/React.createElement(React.Fragment, null, from && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-medium)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, "fra kr."), was && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-muted)',
      textDecoration: 'line-through',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, was), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-black)',
      fontSize: fs,
      color: 'var(--ink-900)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, now)));
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  style,
  ...rest
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: 'grid',
      gap: 12,
      textAlign: align,
      justifyItems: align === 'center' ? 'center' : 'start',
      maxWidth: 720,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: dark ? 'var(--ink-300)' : 'var(--text-muted)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 'var(--rule-w)',
      background: 'var(--red-500)',
      marginTop: 8,
      marginInline: align === 'center' ? 'auto' : 0
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-black)',
      fontSize: 'var(--fs-3xl)',
      letterSpacing: 'var(--ls-display)',
      lineHeight: 'var(--lh-snug)',
      margin: 0,
      color: dark ? 'var(--white)' : 'var(--text-heading)',
      textWrap: 'pretty'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-md)',
      lineHeight: 'var(--lh-relaxed)',
      color: dark ? 'var(--ink-300)' : 'var(--text-body)',
      margin: 0,
      textWrap: 'pretty'
    }
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  campaign: {
    background: 'var(--red-500)',
    color: 'var(--white)',
    border: 'transparent',
    radius: 'var(--radius-none)'
  },
  neutral: {
    background: 'var(--ink-050)',
    color: 'var(--ink-700)',
    border: 'var(--border-subtle)',
    radius: 'var(--radius-pill)'
  },
  success: {
    background: 'var(--green-050)',
    color: 'var(--green-500)',
    border: 'transparent',
    radius: 'var(--radius-pill)'
  },
  warning: {
    background: 'var(--amber-050)',
    color: 'var(--amber-500)',
    border: 'transparent',
    radius: 'var(--radius-pill)'
  },
  info: {
    background: 'var(--blue-050)',
    color: 'var(--blue-500)',
    border: 'transparent',
    radius: 'var(--radius-pill)'
  },
  dark: {
    background: 'var(--ink-900)',
    color: 'var(--white)',
    border: 'transparent',
    radius: 'var(--radius-pill)'
  }
};
function Badge({
  tone = 'neutral',
  children,
  style,
  ...rest
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 24,
      padding: '0 10px',
      borderRadius: t.radius,
      background: t.background,
      color: t.color,
      border: `1px solid ${t.border}`,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-3xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  tone = 'light',
  interactive,
  padding = 'var(--card-pad)',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lift = interactive && hover;
  const tones = {
    light: {
      background: 'var(--surface-card)',
      border: `1px solid ${lift ? 'var(--border-default)' : 'var(--border-subtle)'}`,
      boxShadow: lift ? 'var(--shadow-md)' : 'var(--shadow-sm)'
    },
    sunken: {
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'none'
    },
    dark: {
      background: 'var(--ink-700)',
      border: '1px solid var(--border-dark)',
      boxShadow: 'none',
      color: 'var(--text-inverse)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-card)',
      padding,
      overflow: 'hidden',
      transform: lift ? 'translateY(-2px)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 24,
  color = 'currentColor',
  fill = 0,
  weight = 400,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "material-symbols-outlined",
    "aria-hidden": "true",
    style: {
      fontSize: size,
      color,
      lineHeight: 1,
      display: 'inline-block',
      fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" 0, "opsz" 24`,
      ...style
    }
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ServiceCard({
  category,
  title,
  description,
  was,
  now,
  free,
  campaign,
  image,
  imageAlt,
  imageLabel,
  href = '#',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    interactive: true,
    padding: 0,
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16 / 10',
      background: 'var(--ink-100)',
      overflow: 'hidden',
      display: 'grid',
      placeItems: 'center',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt || '',
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--ink-400)',
      textAlign: 'center',
      padding: 12
    }
  }, imageLabel || 'Bilde mangler'), campaign && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "campaign",
    style: {
      position: 'absolute',
      top: 0,
      left: 0
    }
  }, "Kampanje pris!")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 'var(--card-pad)',
      flex: 1
    }
  }, category && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-3xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, category), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-xl)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--ink-900)',
      margin: 0
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: 0,
      flex: 1,
      textWrap: 'pretty'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    from: !free,
    was: was,
    now: now,
    free: free,
    size: "sm",
    style: {
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-link)'
    }
  }, "Les mer ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron_right",
    size: 18
  })))));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: 'var(--control-h-sm)',
  md: 'var(--control-h-md)',
  lg: 'var(--control-h-lg)'
};
const PAD = {
  sm: '0 14px',
  md: '0 20px',
  lg: '0 28px'
};
const FS = {
  sm: 13,
  md: 15,
  lg: 17
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconEnd,
  fullWidth,
  disabled,
  as = 'button',
  href,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const skins = {
    primary: {
      background: disabled ? 'var(--ink-100)' : press ? 'var(--red-800)' : hover ? 'var(--red-600)' : 'var(--red-500)',
      color: disabled ? 'var(--ink-300)' : 'var(--white)',
      border: '1px solid transparent'
    },
    secondary: {
      background: disabled ? 'var(--ink-050)' : press ? 'var(--ink-100)' : hover ? 'var(--ink-050)' : 'var(--white)',
      color: disabled ? 'var(--ink-300)' : 'var(--ink-900)',
      border: `1px solid ${disabled ? 'var(--border-subtle)' : hover ? 'var(--border-strong)' : 'var(--border-default)'}`
    },
    ghost: {
      background: press ? 'var(--ink-100)' : hover ? 'var(--ink-050)' : 'transparent',
      color: disabled ? 'var(--ink-300)' : 'var(--ink-900)',
      border: '1px solid transparent'
    },
    inverse: {
      background: press ? 'rgba(255,255,255,.24)' : hover ? 'rgba(255,255,255,.14)' : 'transparent',
      color: 'var(--white)',
      border: '1px solid rgba(255,255,255,.35)'
    }
  };
  const Tag = as === 'a' ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: H[size],
      padding: PAD[size],
      borderRadius: 'var(--radius-control)',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: FS[size],
      letterSpacing: 'var(--ls-button)',
      textDecoration: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      whiteSpace: 'nowrap',
      transform: press && !disabled ? 'scale(var(--press-scale))' : 'none',
      transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-instant) var(--ease-standard)',
      ...skins[variant],
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 18 : 20
  }), children, iconEnd && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd,
    size: size === 'sm' ? 18 : 20
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const S = {
  sm: 32,
  md: 40,
  lg: 48
};
function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  disabled,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const skins = {
    ghost: {
      background: hover ? 'var(--ink-050)' : 'transparent',
      color: 'var(--ink-900)',
      border: '1px solid transparent'
    },
    outline: {
      background: hover ? 'var(--ink-050)' : 'var(--white)',
      color: 'var(--ink-900)',
      border: '1px solid var(--border-default)'
    },
    solid: {
      background: hover ? 'var(--red-600)' : 'var(--red-500)',
      color: 'var(--white)',
      border: '1px solid transparent'
    },
    inverse: {
      background: hover ? 'rgba(255,255,255,.14)' : 'transparent',
      color: 'var(--white)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: S[size],
      height: S[size],
      display: 'inline-grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-control)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...skins[variant],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 18 : size === 'lg' ? 26 : 22
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  wordmark: 'assets/logo-kepler-wordmark.svg',
  mark: 'assets/kepler-k.svg',
  anniversary: 'assets/logo-kepler-20.svg'
};
function Logo({
  variant = 'wordmark',
  height = 28,
  base = '',
  style,
  ...rest
}) {
  const h = variant === 'anniversary' ? height * 2.4 : height;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: base + SRC[variant],
    alt: "Kepler Bilservice",
    style: {
      height: h,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected,
  onRemove,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 32,
      padding: '0 14px',
      borderRadius: 'var(--radius-pill)',
      background: selected ? 'var(--ink-900)' : hover ? 'var(--ink-050)' : 'var(--white)',
      color: selected ? 'var(--white)' : 'var(--ink-700)',
      border: `1px solid ${selected ? 'var(--ink-900)' : 'var(--border-default)'}`,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-medium)',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    onClick: onRemove,
    style: {
      fontSize: 16,
      cursor: 'pointer'
    }
  }, "close"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  title,
  footer,
  onClose,
  width = 520,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--overlay-scrim)',
      zIndex: 50
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: 'calc(100% - 32px)',
      background: 'var(--white)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '20px 20px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-xl)',
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--ink-900)',
      margin: 0
    }
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "close",
    label: "Lukk",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 24px 24px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-normal)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: 16,
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  success: {
    icon: 'check_circle',
    color: 'var(--green-500)'
  },
  error: {
    icon: 'error',
    color: 'var(--red-500)'
  },
  info: {
    icon: 'info',
    color: 'var(--blue-500)'
  }
};
function Toast({
  tone = 'success',
  title,
  description,
  onClose,
  style,
  ...rest
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: 380,
      maxWidth: '100%',
      padding: '14px 14px 14px 16px',
      background: 'var(--ink-900)',
      color: 'var(--white)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 22,
    color: t.color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-sm)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-300)',
      marginTop: 2
    }
  }, description)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "close",
    label: "Lukk",
    size: "sm",
    variant: "inverse",
    onClick: onClose
  }));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  content,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%,-8px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,8px)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translate(8px,-50%)'
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, rest), children, open && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 40,
      whiteSpace: 'nowrap',
      background: 'var(--ink-900)',
      color: 'var(--white)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-2xs)',
      boxShadow: 'var(--shadow-md)'
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked,
  disabled,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: '0 0 20px',
      display: 'grid',
      placeItems: 'center',
      marginTop: 2,
      borderRadius: 'var(--radius-xs)',
      background: disabled ? 'var(--ink-100)' : checked ? 'var(--red-500)' : 'var(--white)',
      border: `1px solid ${checked ? 'var(--red-500)' : 'var(--border-strong)'}`,
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    color: "var(--white)",
    weight: 700
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: disabled ? 'var(--ink-300)' : 'var(--ink-900)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  disabled,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  const borderColor = error ? 'var(--red-500)' : focus ? 'var(--ink-900)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: 'grid',
      gap: 6,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--ink-700)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 'var(--control-h-md)',
      padding: '0 12px',
      background: disabled ? 'var(--ink-050)' : 'var(--white)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? '0 0 0 3px rgba(226,38,20,.14)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: "var(--ink-400)"
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'inherit',
      fontSize: 'var(--fs-sm)',
      color: disabled ? 'var(--ink-300)' : 'var(--ink-900)'
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--ink-400)'
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xs)',
      color: error ? 'var(--red-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  description,
  price,
  checked,
  disabled,
  name,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: 14,
      border: `1px solid ${checked ? 'var(--ink-900)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      background: 'var(--white)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)',
      transition: 'border-color var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: '0 0 20px',
      borderRadius: '50%',
      marginTop: 2,
      border: `1px solid ${checked ? 'var(--red-500)' : 'var(--border-strong)'}`,
      display: 'grid',
      placeItems: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--red-500)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--ink-900)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description)), price && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-black)',
      fontSize: 'var(--fs-md)',
      color: 'var(--ink-900)'
    }
  }, price));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  disabled,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: 'grid',
      gap: 6,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--ink-700)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 'var(--control-h-md)',
      background: disabled ? 'var(--ink-050)' : 'var(--white)',
      border: `1px solid ${focus ? 'var(--ink-900)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: uid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '0 40px 0 12px',
      font: 'inherit',
      fontSize: 'var(--fs-sm)',
      color: 'var(--ink-900)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: typeof o === 'string' ? o : o.value,
    value: typeof o === 'string' ? o : o.value
  }, typeof o === 'string' ? o : o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "expand_more",
    size: 20,
    color: "var(--ink-400)",
    style: {
      position: 'absolute',
      right: 10,
      pointerEvents: 'none'
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked,
  disabled,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      padding: 2,
      background: disabled ? 'var(--ink-100)' : checked ? 'var(--red-500)' : 'var(--ink-200)',
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-xs)',
      transform: checked ? 'translateX(18px)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--ink-900)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  tone = 'light',
  style,
  ...rest
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: 28,
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.12)' : 'var(--border-subtle)'}`,
      ...style
    }
  }, rest), items.map(it => {
    const key = typeof it === 'string' ? it : it.value;
    const label = typeof it === 'string' ? it : it.label;
    const active = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(key),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0 0 12px',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-sm)',
        fontWeight: active ? 'var(--fw-bold)' : 'var(--fw-medium)',
        color: active ? dark ? 'var(--white)' : 'var(--ink-900)' : dark ? 'var(--ink-300)' : 'var(--text-muted)',
        boxShadow: active ? 'inset 0 -3px 0 var(--red-500)' : 'none',
        transition: 'color var(--dur-fast) var(--ease-standard)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Phone.jsx
try { (() => {
function Phone({
  children,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      justifyItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 760,
      background: 'var(--white)',
      borderRadius: 44,
      border: '10px solid #0d0f12',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--ink-900)',
      flex: '0 0 44px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "09:41"), /*#__PURE__*/React.createElement("span", null, "Kepler"), /*#__PURE__*/React.createElement("span", null, "100 %")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, label));
}
function TabBar({
  tab,
  setTab
}) {
  const {
    Icon
  } = window.KeplerBilserviceDesignSystem_333da5;
  const items = [['home', 'Hjem', 'home'], ['car', 'Bilen min', 'directions_car'], ['book', 'Bestill', 'calendar_month'], ['me', 'Meg', 'person']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--white)',
      paddingBottom: 8
    }
  }, items.map(([k, l, i]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    style: {
      background: 'none',
      border: 'none',
      padding: '10px 0 6px',
      display: 'grid',
      justifyItems: 'center',
      gap: 2,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 24,
    fill: tab === k ? 1 : 0,
    color: tab === k ? 'var(--red-500)' : 'var(--ink-400)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: tab === k ? 700 : 500,
      color: tab === k ? 'var(--ink-900)' : 'var(--ink-400)'
    }
  }, l))));
}
Object.assign(window, {
  Phone,
  TabBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Phone.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Screens.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  Icon,
  Logo,
  Input,
  Radio,
  Checkbox,
  PriceTag,
  Tabs,
  Toast
} = window.KeplerBilserviceDesignSystem_333da5;
const PAD = {
  padding: 20
};
function Login({
  onDone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-900)',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 24,
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    base: "../../",
    height: 26
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: 'var(--white)',
      fontSize: 'var(--fs-2xl)',
      letterSpacing: 'var(--ls-display)',
      margin: 0
    }
  }, "Logg inn med SMS"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-300)',
      fontSize: 'var(--fs-sm)',
      margin: 0
    }
  }, "Vi sender deg en engangskode. Ingen passord \xE5 huske."), /*#__PURE__*/React.createElement(Input, {
    label: "",
    placeholder: "480 12 345",
    suffix: "+47",
    style: {
      marginTop: 4
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    onClick: onDone
  }, "Send kode"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-400)',
      fontSize: 'var(--fs-2xs)',
      textAlign: 'center'
    }
  }, "Ved \xE5 logge inn godtar du personvernerkl\xE6ringen."));
}
function AppHome({
  setTab
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAD,
      display: 'grid',
      gap: 16,
      background: 'var(--surface-sunken)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-2xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700
    }
  }, "GOD MORGEN"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-2xl)',
      letterSpacing: 'var(--ls-display)'
    }
  }, "Ola")), /*#__PURE__*/React.createElement(Logo, {
    base: "../../",
    variant: "mark",
    height: 26
  })), /*#__PURE__*/React.createElement(Card, {
    padding: 0,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/lakkarbeid-lofter.jpg",
    alt: "Bilen din p\xE5 verkstedet",
    style: {
      width: '100%',
      height: 130,
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-900)',
      color: 'var(--white)',
      padding: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--ink-300)'
    }
  }, "EL 41929"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--fs-lg)'
    }
  }, "Volvo XC60")), /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "Inne p\xE5 verksted")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: 'grid',
      gap: 12
    }
  }, [['Mottatt', 'check_circle', 'done'], ['Vask og clay-sliping', 'check_circle', 'done'], ['Polering', 'radio_button_checked', 'now'], ['Forsegling', 'radio_button_unchecked', 'next'], ['Klar til henting', 'radio_button_unchecked', 'next']].map(([t, i, s]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20,
    color: s === 'done' ? 'var(--green-500)' : s === 'now' ? 'var(--red-500)' : 'var(--ink-200)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: s === 'now' ? 600 : 400,
      color: s === 'next' ? 'var(--text-muted)' : 'var(--ink-900)'
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 12
    }
  }, "Beregnet ferdig i dag kl. 15.30. Vi sender SMS."))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-display)'
    }
  }, "Neste vedlikehold"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "om 4 mnd")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--ink-100)',
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '68%',
      height: '100%',
      background: 'var(--grad-red)'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)',
      marginTop: 10
    }
  }, "Lakkforseglingen din holder ett \xE5r ved normal bruk. Vi minner deg p\xE5 i god tid.")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    onClick: () => setTab('book')
  }, "Bestill time"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--fs-md)',
      margin: '8px 0 10px'
    }
  }, "Kampanjer n\xE5"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, [['Fluid Film Express', '4.990,-', '3.990,-'], ['Kepler lakkforsegling', '7.590,-', '3.990,-']].map(([t, w, n]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "campaign",
    style: {
      marginBottom: 6
    }
  }, "Kampanje pris!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--fs-sm)'
    }
  }, t)), /*#__PURE__*/React.createElement(PriceTag, {
    from: true,
    was: w,
    now: n,
    size: "sm"
  }))))));
}
function Booking({
  onBooked
}) {
  const [step, setStep] = React.useState(0);
  const [svc, setSvc] = React.useState('a');
  const [slot, setSlot] = React.useState('to-0800');
  const steps = ['Tjeneste', 'Tidspunkt', 'Bekreft'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...PAD,
      display: 'grid',
      gap: 16,
      alignContent: 'start',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      flex: 1,
      display: 'grid',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      borderRadius: 999,
      background: i <= step ? 'var(--red-500)' : 'var(--ink-100)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: i <= step ? 'var(--ink-900)' : 'var(--ink-300)'
    }
  }, s)))), step === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-xl)',
      margin: '8px 0 0'
    }
  }, "Hva skal vi gj\xF8re?"), /*#__PURE__*/React.createElement(Radio, {
    name: "s",
    checked: svc === 'a',
    onChange: () => setSvc('a'),
    label: "Kepler lakkforsegling",
    description: "Voksbasert, ett \xE5rs holdbarhet",
    price: "3.990,-"
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "s",
    checked: svc === 'b',
    onChange: () => setSvc('b'),
    label: "Evershine Graphene",
    description: "Keramisk, inntil 6 \xE5rs garanti",
    price: "12.990,-"
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "s",
    checked: svc === 'c',
    onChange: () => setSvc('c'),
    label: "Gratis rustsjekk",
    description: "Uforpliktende visuell kontroll",
    price: "Gratis"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Lakkrens",
    description: "Tilleggstjeneste, +3.590,-"
  })), step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-xl)',
      margin: '8px 0 0'
    }
  }, "N\xE5r passer det?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 8
    }
  }, ['Man 11.', 'Tir 12.', 'Ons 13.', 'Tor 14.'].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      textAlign: 'center',
      padding: '10px 0',
      borderRadius: 'var(--radius-md)',
      border: `1px solid ${i === 3 ? 'var(--ink-900)' : 'var(--border-default)'}`,
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: i === 3 ? 700 : 500
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, [['to-0800', '08:00', 'Ledig'], ['to-1000', '10:00', 'Ledig'], ['to-1300', '13:00', 'Opptatt']].map(([k, t, s]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    disabled: s === 'Opptatt',
    onClick: () => setSlot(k),
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      cursor: s === 'Opptatt' ? 'not-allowed' : 'pointer',
      border: `1px solid ${slot === k ? 'var(--ink-900)' : 'var(--border-default)'}`,
      background: s === 'Opptatt' ? 'var(--ink-050)' : 'var(--white)',
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      fontWeight: 600,
      color: s === 'Opptatt' ? 'var(--ink-300)' : 'var(--ink-900)'
    }
  }, t, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 400,
      color: s === 'Opptatt' ? 'var(--ink-300)' : 'var(--green-500)'
    }
  }, s))))), step === 2 && /*#__PURE__*/React.createElement(Card, {
    tone: "sunken",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-xl)',
      margin: 0
    }
  }, "Bekreft timen"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      marginTop: 14,
      fontSize: 'var(--fs-sm)'
    }
  }, [['Tjeneste', 'Kepler lakkforsegling'], ['Bil', 'Volvo XC60 · EL 41929'], ['Tid', 'Torsdag 14. august, 08:00'], ['Sted', 'Andebuveien 63, Sem'], ['Pris', 'fra kr. 3.990,-']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      borderBottom: '1px solid var(--border-subtle)',
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-display)'
    }
  }, v))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 4
    }
  }, step > 0 && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => setStep(step - 1)
  }, "Tilbake"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    style: {
      flex: 1
    },
    onClick: () => step === 2 ? onBooked() : setStep(step + 1)
  }, step === 2 ? 'Bestill time' : 'Neste')));
}
Object.assign(window, {
  Login,
  AppHome,
  Booking
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Dashboard.jsx
try { (() => {
const {
  Logo,
  Icon,
  Button,
  Badge,
  Card,
  Tabs,
  Input,
  IconButton,
  Tag
} = window.KeplerBilserviceDesignSystem_333da5;
const JOBS = [['ORD-20481', 'EL 41929', 'Volvo XC60', 'Kepler lakkforsegling', 'Polering', 'progress', 'Kim R.', '15:30'], ['ORD-20482', 'BS 88214', 'Tesla Model Y', 'Evershine Graphene', 'Mottatt', 'new', 'Ikke tildelt', '—'], ['ORD-20483', 'DN 30117', 'VW Transporter', 'Fluid Film Pluss', 'Understell', 'progress', 'Jonas H.', '17:00'], ['ORD-20484', 'EK 55029', 'Toyota RAV4', 'Gratis rustsjekk', 'Klar til henting', 'done', 'Kim R.', '11:00'], ['ORD-20485', 'CV 90188', 'Audi Q5', 'Salgsklargjøring', 'Venter på deler', 'blocked', 'Marius T.', '—'], ['ORD-20486', 'AF 21903', 'Ford Ranger', 'PDR bulkoppretting', 'Mottatt', 'new', 'Ikke tildelt', '—']];
const TONE = {
  new: 'info',
  progress: 'warning',
  done: 'success',
  blocked: 'dark'
};
function Sidebar({
  view,
  setView
}) {
  const items = [['board', 'Jobber', 'view_kanban'], ['calendar', 'Kalender', 'calendar_month'], ['customers', 'Kunder', 'group'], ['prices', 'Prisliste', 'sell'], ['settings', 'Innstillinger', 'settings']];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 232,
      background: 'var(--ink-900)',
      color: 'var(--white)',
      display: 'flex',
      flexDirection: 'column',
      padding: 20,
      gap: 24,
      flex: '0 0 232px'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    base: "../../",
    height: 22
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'grid',
      gap: 2
    }
  }, items.map(([k, l, i]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setView(k),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      background: view === k ? 'rgba(255,255,255,.08)' : 'transparent',
      color: view === k ? 'var(--white)' : 'var(--ink-300)',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: view === k ? 700 : 500,
      boxShadow: view === k ? 'inset 3px 0 0 var(--red-500)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20,
    fill: view === k ? 1 : 0
  }), l))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.12)',
      paddingTop: 16,
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--grad-chrome)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 13,
      color: 'var(--ink-900)'
    }
  }, "KR"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontFamily: 'var(--font-display)',
      fontWeight: 600
    }
  }, "Kim R."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-400)'
    }
  }, "Sem, T\xF8nsberg"))));
}
function Board({
  onOpen
}) {
  const [tab, setTab] = React.useState('I dag');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'grid',
      gap: 20,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 'var(--ls-eyebrow)',
      color: 'var(--text-muted)'
    }
  }, "VERKSTED SEM"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      letterSpacing: 'var(--ls-display)',
      margin: '4px 0 0'
    }
  }, "Jobber i dag")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "S\xF8k reg.nr eller ordre",
    icon: "search",
    style: {
      width: 260
    }
  }), /*#__PURE__*/React.createElement(Button, {
    icon: "add"
  }, "Ny jobb")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, [['Inne på verksted', '6', 'var(--ink-900)'], ['Klar til henting', '2', 'var(--green-500)'], ['Venter på deler', '1', 'var(--amber-500)'], ['Omsetning i dag', 'kr 48.290,-', 'var(--red-500)']].map(([l, v, c]) => /*#__PURE__*/React.createElement(Card, {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '.08em',
      textTransform: 'uppercase'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-3xl)',
      letterSpacing: 'var(--ls-display)',
      color: c,
      marginTop: 6
    }
  }, v)))), /*#__PURE__*/React.createElement(Tabs, {
    items: ['I dag', 'Denne uken', 'Alle aktive'],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-sunken)'
    }
  }, ['Ordre', 'Reg.nr', 'Bil', 'Tjeneste', 'Status', 'Tekniker', 'Ferdig'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '12px 16px',
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, JOBS.map(j => /*#__PURE__*/React.createElement("tr", {
    key: j[0],
    onClick: onOpen,
    style: {
      cursor: 'pointer',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, j[0]), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, j[1]), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600
    }
  }, j[2]), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px'
    }
  }, j[3]), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: TONE[j[5]]
  }, j[4])), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      color: j[6] === 'Ikke tildelt' ? 'var(--text-muted)' : 'inherit'
    }
  }, j[6]), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, j[7])))))));
}
function JobDetail({
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'grid',
      gap: 20,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow_back",
    label: "Tilbake",
    variant: "outline",
    onClick: onBack
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "ORD-20481 \xB7 EL 41929"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      letterSpacing: 'var(--ls-display)',
      margin: 0
    }
  }, "Volvo XC60")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "warning"
  }, "Polering"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Send SMS til kunde"), /*#__PURE__*/React.createElement(Button, null, "Marker som ferdig")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      margin: '0 0 16px'
    }
  }, "Arbeidsflyt"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, [['Mottatt', '07:42', 'done'], ['Grundig nedvask', '08:15', 'done'], ['Clay-sliping', '09:30', 'done'], ['En-stegs polering', 'Pågår', 'now'], ['Voksbeskyttelse', '—', 'next'], ['Sluttkontroll', '—', 'next']].map(([t, time, s]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s === 'done' ? 'check_circle' : s === 'now' ? 'radio_button_checked' : 'radio_button_unchecked',
    size: 22,
    color: s === 'done' ? 'var(--green-500)' : s === 'now' ? 'var(--red-500)' : 'var(--ink-200)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontWeight: s === 'now' ? 600 : 400,
      color: s === 'next' ? 'var(--text-muted)' : 'var(--ink-900)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, time))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      margin: '0 0 12px'
    }
  }, "Dokumentasjon"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 10
    }
  }, [['Før — front', 'smart-repair-front.jpg'], ['Før — panser', 'klargjoring-hvit-bil.jpg'], ['Under — polering', 'polering-frontrute.jpg'], ['Etter', 'handtork-solvbil.jpg']].map(([l, f]) => /*#__PURE__*/React.createElement("figure", {
    key: l,
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: '../../assets/photos/' + f,
    alt: l,
    style: {
      width: '100%',
      aspectRatio: '4/3',
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-md)',
      margin: '0 0 12px'
    }
  }, "Kunde"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      fontSize: 'var(--fs-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-display)'
    }
  }, "Ola Nordmann")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, "+47 480 12 345"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Kunde siden 2019 \xB7 7 bes\xF8k"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-md)',
      margin: '0 0 12px'
    }
  }, "Ordre"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      fontSize: 'var(--fs-sm)'
    }
  }, [['Kepler lakkforsegling', '3.990,-'], ['Lakkrens', '3.590,-'], ['Sum', '7.580,-']].map(([n, p], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: 8,
      borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
      fontWeight: i === 2 ? 700 : 400
    }
  }, /*#__PURE__*/React.createElement("span", null, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, "kr ", p))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-md)',
      margin: '0 0 10px'
    }
  }, "Garanti"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "1 \xE5r voks"), /*#__PURE__*/React.createElement(Tag, null, "Prisgaranti"), /*#__PURE__*/React.createElement(Tag, null, "100 % forn\xF8yd"))))));
}
Object.assign(window, {
  Sidebar,
  Board,
  JobDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/docs/Docs.jsx
try { (() => {
const {
  Logo,
  Icon,
  Button,
  Card,
  Input,
  Badge,
  Tag
} = window.KeplerBilserviceDesignSystem_333da5;
const NAV = [['Kom i gang', ['Slik bestiller du time', 'Hva skjer på verkstedet', 'Levering og henting']], ['Vedlikehold', ['Råd om vask', 'Vedlikehold av lakkforsegling', 'Vinterråd']], ['Garantier', ['Våre garantier', 'Overføring av garanti', 'Prisgaranti']], ['Produkter', ['Evershine Graphene', 'Fluid Film', 'Xpel PPF']]];
function Docs() {
  const [active, setActive] = React.useState('Vedlikehold av lakkforsegling');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 280,
      flex: '0 0 280px',
      borderRight: '1px solid var(--border-subtle)',
      padding: 24,
      position: 'sticky',
      top: 0,
      alignSelf: 'flex-start',
      height: '100vh',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    base: "../../",
    height: 22
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "S\xF8k i hjelp",
    icon: "search",
    style: {
      margin: '20px 0 24px'
    }
  }), NAV.map(([group, items]) => /*#__PURE__*/React.createElement("div", {
    key: group,
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, group), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 2
    }
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it,
    onClick: () => setActive(it),
    style: {
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      padding: '7px 10px',
      borderRadius: 'var(--radius-sm)',
      background: active === it ? 'var(--ink-050)' : 'transparent',
      boxShadow: active === it ? 'inset 3px 0 0 var(--red-500)' : 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-sm)',
      fontWeight: active === it ? 600 : 400,
      color: active === it ? 'var(--ink-900)' : 'var(--ink-500)'
    }
  }, it)))))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      justifyContent: 'center',
      padding: '56px 48px'
    }
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: 720,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Hjelp ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 16
  }), " Vedlikehold"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-4xl)',
      letterSpacing: 'var(--ls-display)',
      lineHeight: 'var(--lh-tight)',
      margin: '12px 0 16px',
      color: 'var(--ink-900)'
    }
  }, active), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lg)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Lakkforseglingen holder ett \xE5r ved normal bruk. Med riktig vask beholder du glansen lenger, og du unng\xE5r at forurensning fester seg i lakkens porer."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-xl)',
      margin: '40px 0 12px'
    }
  }, "Slik vasker du bilen"), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'grid',
      gap: 10,
      padding: 0,
      margin: 0,
      listStyle: 'none'
    }
  }, ['Vask med pH-nøytralt bilshampo, aldri oppvasksåpe.', 'Bruk to bøtter: én til vask, én til å skylle vaskehansken.', 'Tørk med ren mikrofiberklut, ikke i direkte sol.', 'Unngå automatvask med børster de første to ukene.'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      fontSize: 'var(--fs-md)',
      lineHeight: 'var(--lh-relaxed)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check_circle",
    size: 22,
    color: "var(--green-500)"
  }), t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      margin: '32px 0'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/skumvask.jpg",
    alt: "Skumvask",
    style: {
      width: '100%',
      height: 180,
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/handtork-solvbil.jpg",
    alt: "H\xE5ndt\xF8rk med mikrofiber",
    style: {
      width: '100%',
      height: 180,
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)'
    }
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "sunken",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-display)'
    }
  }, "Er du usikker?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-body)',
      margin: '6px 0 14px'
    }
  }, "Ta kontakt, s\xE5 gir vi deg faglige r\xE5d om forebyggende vedlikehold av bilen din."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, null, "Bestill time"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "call"
  }, "Ring 33 33 44 00"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 20,
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)'
    }
  }, "Var dette til hjelp?"), /*#__PURE__*/React.createElement(Tag, null, "Ja"), /*#__PURE__*/React.createElement(Tag, null, "Nei"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 200,
      flex: '0 0 200px',
      marginLeft: 40,
      position: 'sticky',
      top: 56,
      alignSelf: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 10
    }
  }, "P\xE5 denne siden"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      fontSize: 'var(--fs-xs)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--ink-900)',
      fontWeight: 600
    }
  }, "Slik vasker du bilen"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--ink-500)'
    }
  }, "Er du usikker?")))));
}
Object.assign(window, {
  Docs
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/docs/Docs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Logo,
  Badge
} = window.KeplerBilserviceDesignSystem_333da5;
const NAV = [{
  key: 'home',
  label: 'Hjem'
}, {
  key: 'services',
  label: 'Våre tjenester'
}, {
  key: 'detail',
  label: 'Lakkforsegling'
}, {
  key: 'contact',
  label: 'Kontakt'
}];
function Header({
  page,
  go,
  overlay
}) {
  const dark = overlay;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      height: 72,
      background: dark ? 'rgba(13,15,18,.72)' : 'var(--white)',
      backdropFilter: dark ? 'blur(12px)' : 'none',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.12)' : 'var(--border-subtle)'}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      height: '100%',
      padding: '0 var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    base: "../../",
    height: 24
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 24,
      marginLeft: 8
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.key,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(n.key);
    },
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-sm)',
      fontWeight: page === n.key ? 'var(--fw-bold)' : 'var(--fw-medium)',
      color: dark ? page === n.key ? 'var(--white)' : 'var(--ink-200)' : page === n.key ? 'var(--ink-900)' : 'var(--ink-500)',
      textDecoration: 'none',
      paddingBottom: 4,
      whiteSpace: 'nowrap',
      boxShadow: page === n.key ? 'inset 0 -3px 0 var(--red-500)' : 'none'
    }
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      color: dark ? 'var(--ink-200)' : 'var(--ink-500)',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "call",
    size: 18
  }), " 33 33 44 00"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "search",
    label: "S\xF8k i Kepler",
    variant: dark ? 'inverse' : 'ghost'
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: () => go('contact')
  }, "Bestill time")));
}
function Footer({
  go
}) {
  const col = {
    display: 'grid',
    gap: 8,
    alignContent: 'start'
  };
  const link = {
    color: 'var(--ink-300)',
    fontSize: 'var(--fs-sm)',
    textDecoration: 'none'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-900)',
      color: 'var(--white)',
      paddingTop: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter) 48px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement(Logo, {
    base: "../../",
    height: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...link,
      marginTop: 12
    }
  }, "Andebuveien 63, 3170 Sem"), /*#__PURE__*/React.createElement("div", {
    style: link
  }, "33 33 44 00"), /*#__PURE__*/React.createElement("div", {
    style: link
  }, "kundeservice@kepler.no"), /*#__PURE__*/React.createElement("div", {
    style: link
  }, "Man\u2013fre 07.30\u201317.00"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: '12px 14px',
      border: '1px solid rgba(255,255,255,.14)',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--ink-300)',
      maxWidth: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink-400)',
      marginBottom: 6
    }
  }, "[NBF-logo mangler]"), "Medlem av Norges Bilbransjeforbund \u2013 for din trygghet.")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--white)',
      fontSize: 'var(--fs-xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      margin: '0 0 4px'
    }
  }, "V\xE5re tjenester"), ['Lakkforsegling', 'Antirust', 'Gratis rustsjekk', 'Bilpleie', 'Bilsalg', 'Smart Repair', 'Bobil og caravan'].map(t => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('services');
    },
    style: link
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--white)',
      fontSize: 'var(--fs-xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      margin: '0 0 4px'
    }
  }, "Annet"), ['Siste nytt', 'Kurs', 'Samfunnsansvar', 'For bedriftskunder', 'Kampanjetilbud', 'Garantier'].map(t => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "#",
    onClick: e => e.preventDefault(),
    style: link
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--white)',
      fontSize: 'var(--fs-xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      margin: '0 0 4px'
    }
  }, "Nyheter p\xE5 mail"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...link,
      lineHeight: 'var(--lh-normal)'
    }
  }, "Motta rykende ferske nyheter, kampanjer og invitasjoner til v\xE5re events."), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    style: {
      marginTop: 8
    }
  }, "Meld deg p\xE5 nyhetsbrevet"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--ink-400)'
    }
  }, "[Klarna-merke mangler]"), /*#__PURE__*/React.createElement("div", {
    style: link
  }, "Hos oss kan du betale med Klarna"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '18px var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--ink-400)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Kepler Bilservice AS"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--ink-400)'
    }
  }, "Personvernerkl\xE6ring"))));
}
function ImageSlot({
  label,
  src,
  alt,
  height = 240,
  radius = 'var(--radius-md)',
  style
}) {
  if (src) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: alt || label || '',
      style: {
        display: 'block',
        width: '100%',
        height,
        objectFit: 'cover',
        borderRadius: radius,
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: radius,
      background: 'var(--ink-100)',
      border: '1px dashed var(--border-default)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--ink-400)',
      textAlign: 'center',
      padding: 16,
      ...style
    }
  }, label);
}
Object.assign(window, {
  Header,
  Footer,
  ImageSlot,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
const {
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Card,
  SectionHeading,
  Icon,
  Dialog,
  Toast
} = window.KeplerBilserviceDesignSystem_333da5;
function Contact() {
  const [pakke, setPakke] = React.useState('a');
  const [samtykke, setSamtykke] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "ONLINE BOOKING",
    title: "Bestill time",
    lead: "Fyll ut skjemaet, s\xE5 tar vi kontakt p\xE5 SMS for \xE5 bekrefte tidspunkt. Du kan ogs\xE5 ringe oss p\xE5 33 33 44 00."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 48,
      marginTop: 40,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Navn",
    placeholder: "Ola Nordmann"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Mobil",
    placeholder: "480 12 345",
    suffix: "+47"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "E-post",
    placeholder: "ola@example.no"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Registreringsnummer",
    placeholder: "EL 41929",
    icon: "directions_car"
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Verksted",
    options: ['Sem, Tønsberg – Andebuveien 63']
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 600,
      color: 'var(--ink-700)',
      marginBottom: 8
    }
  }, "Velg beskyttelse"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "p",
    checked: pakke === 'a',
    onChange: () => setPakke('a'),
    label: "Kepler lakkforsegling",
    description: "Voksbasert, ett \xE5rs holdbarhet",
    price: "fra 3.990,-"
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "p",
    checked: pakke === 'b',
    onChange: () => setPakke('b'),
    label: "Evershine Graphene",
    description: "Keramisk, inntil 6 \xE5rs garanti",
    price: "fra 12.990,-"
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "p",
    checked: pakke === 'c',
    onChange: () => setPakke('c'),
    label: "Gratis rustsjekk",
    description: "Uforpliktende visuell kontroll",
    price: "Gratis"
  }))), /*#__PURE__*/React.createElement(Checkbox, {
    checked: samtykke,
    onChange: () => setSamtykke(!samtykke),
    label: "Jeg samtykker til at mine opplysninger behandles i henhold til personvernerkl\xE6ringen."
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    onClick: () => setConfirm(true)
  }, "Bestill time"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "dark"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--white)',
      fontSize: 'var(--fs-lg)',
      margin: 0
    }
  }, "Kepler Bilservice AS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      marginTop: 16,
      fontSize: 'var(--fs-sm)',
      color: 'var(--ink-200)'
    }
  }, [['location_on', 'Andebuveien 63, 3170 Sem'], ['call', '33 33 44 00'], ['mail', 'kundeservice@kepler.no'], ['schedule', 'Man–fre 07.30–17.00']].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20,
    color: "var(--red-500)"
  }), t)))), /*#__PURE__*/React.createElement(ImageSlot, {
    src: "../../assets/photos/mottak-lounge-varebil.jpg",
    alt: "Kundemottaket hos Kepler, Andebuveien 63",
    height: 220
  }))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    title: "Bekreft timen",
    width: 420,
    onClose: () => setConfirm(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Avbryt"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setConfirm(false);
        setDone(true);
      }
    }, "Bestill time"))
  }, "Torsdag 14. august kl. 08:00 hos Kepler Bilservice, Andebuveien 63, Sem. Vi sender deg en SMS dagen f\xF8r."), done && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Timen er bestilt",
    description: "Torsdag 14. august, 08:00",
    onClose: () => setDone(false)
  })));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Icon,
  Badge,
  Card,
  SectionHeading,
  ServiceCard,
  Tag
} = window.KeplerBilserviceDesignSystem_333da5;
const CATEGORIES = [{
  eyebrow: 'Se våre',
  label: 'Kampanjer',
  icon: 'percent_discount'
}, {
  eyebrow: 'Se våre tjenester innen',
  label: 'Bilpleie',
  icon: 'local_car_wash'
}, {
  eyebrow: 'Se våre tjenester innen',
  label: 'Antirust',
  icon: 'shield'
}, {
  eyebrow: 'Se våre tjenester innen',
  label: 'Lakkbeskyttelse',
  icon: 'auto_awesome'
}, {
  eyebrow: 'Se våre tjenester innen',
  label: 'Film og folie',
  icon: 'layers'
}, {
  eyebrow: 'Se hva vi kan tilby innen',
  label: 'Smart Repair',
  icon: 'build'
}];
const FEATURED = [{
  campaign: true,
  category: 'LAKKFORSEGLING',
  title: 'Kepler lakkforsegling',
  description: 'Med Kepler Lakkforsegling får du det du trenger av årlig vedlikehold til lakken på bilen din!',
  was: '7.590,-',
  now: '3.990,-',
  image: '../../assets/photos/lakkforsegling-rod-bil.jpg',
  imageAlt: 'Lakkforsegling av rød bil'
}, {
  campaign: true,
  category: 'KOMPLETT ANTIRUSTPROGRAM',
  title: 'Kepler Premium antirust',
  description: 'Komplett rustbeskyttelse – vår beste og mest omfattende understellsbehandling med inntil 16 års garanti!',
  now: '11.990,-',
  image: '../../assets/photos/antirust-understell.jpg',
  imageAlt: 'Understellsbehandling'
}, {
  campaign: true,
  category: 'LAKKFORSEGLING',
  title: 'Kepler Pure Grade',
  description: 'Gi bilen din det beste fra to verdener: high-tech beskyttelse og visuell perfeksjon. Opplev forskjellen du også!',
  now: '15.990,-',
  image: '../../assets/photos/handtork-solvbil.jpg',
  imageAlt: 'Håndtørk av sølvfarget bil'
}];
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--ink-900)',
      color: 'var(--white)',
      marginTop: -72
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/verksted-kepler-skilt.jpg",
    alt: "Kepler-verkstedet p\xE5 Sem",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--protection-gradient)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '200px var(--gutter) var(--section-y-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-eyebrow)',
      color: 'var(--ink-300)'
    }
  }, "KEPLER BILSERVICE AS"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 3,
      background: 'var(--red-500)',
      margin: '10px 0 20px'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-5xl)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--white)',
      maxWidth: 780,
      margin: 0
    }
  }, "Vedlikehold l\xF8nner seg", /*#__PURE__*/React.createElement("br", null), "\u2013 unng\xE5 un\xF8dvendige kostnader!"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 620,
      marginTop: 20,
      fontSize: 'var(--fs-lg)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--ink-200)'
    }
  }, "I dag beholder mange bilen lenger. Da er det ikke bare hva du kj\xF8rer som betyr noe \u2013 men hvordan du tar vare p\xE5 det. Hos Kepler s\xF8rger vi for at bilen din holder seg i god stand, varer lenger og koster deg mindre over tid."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('contact')
  }, "Bestill time"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "inverse",
    onClick: () => go('services')
  }, "Tips og r\xE5d om vedlikehold")))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "HOVEDMENY",
    title: "Finn riktig tjeneste"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16,
      marginTop: 32
    }
  }, CATEGORIES.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.label,
    interactive: true,
    style: {
      cursor: 'pointer'
    },
    onClick: () => go('services')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 36,
    color: "var(--ink-900)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-display)',
      letterSpacing: '.06em',
      textTransform: 'uppercase'
    }
  }, c.eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-xl)',
      color: 'var(--ink-900)',
      letterSpacing: 'var(--ls-heading)'
    }
  }, c.label))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "KAMPANJETILBUD",
    title: "Spar penger n\xE5!",
    lead: "Benytt deg av v\xE5re kampanjetilbud, f\xE5 bilpleie til reduserte priser."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconEnd: "chevron_right",
    onClick: () => go('services')
  }, "Vis alle tjenester")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      marginTop: 32
    }
  }, FEATURED.map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s, {
    onClick: () => go('detail'),
    style: {
      cursor: 'pointer'
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ink-800)',
      color: 'var(--white)',
      marginTop: 'var(--section-y)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(ImageSlot, {
    src: "../../assets/photos/kundemottak-glassvegg.jpg",
    alt: "Kundemottaket med glassvegg inn mot verkstedet",
    height: 340
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "dark",
    eyebrow: "KOMPETANSE GIR TRYGGHET",
    title: "Se arbeidet bli gjort",
    lead: "Kundemottaket har glassvegg inn mot verkstedet, s\xE5 du kan f\xF8lge med mens bilen din blir behandlet. Som eksperter p\xE5 lakkforsegling og utvikleren av Evershine kan du stole p\xE5 at du f\xE5r beskyttelse og resultat i aller ypperste klasse."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      marginTop: 36
    }
  }, [['20+', 'års erfaring i Vestfold'], ['16 år', 'garanti på antirust'], ['100 %', 'fornøydgaranti']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-3xl)',
      letterSpacing: 'var(--ls-display)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-300)'
    }
  }, l))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "format_quote",
    size: 40,
    color: "var(--red-500)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-2xl)',
      lineHeight: 1.35,
      letterSpacing: 'var(--ls-heading)',
      color: 'var(--ink-900)',
      margin: '12px 0 18px',
      textWrap: 'pretty'
    }
  }, "\xABVeldig forn\xF8yd med servicen hos Kepler Bilservice. Profesjonelle, effektive og \xE6rlige hele veien. Det er tydelig at de bryr seg om b\xE5de bilen og kunden.\xBB"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, "EGIL NORMANN P.")));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServiceDetail.jsx
try { (() => {
const {
  Button,
  Icon,
  Badge,
  Card,
  PriceTag,
  Tabs,
  SectionHeading
} = window.KeplerBilserviceDesignSystem_333da5;
const STEPS = [['Grundig nedvask', 'Hele bilen vaskes ned slik at overflaten er ren før behandling.'], ['Clay-sliping', 'Forurensning som ikke lar seg vaske bort fjernes for hånd fra lakkens porer.'], ['En-stegs polering', 'Lett slitasje og merker fjernes, og overflaten klargjøres for å binde seg med voksbeskyttelsen.'], ['Voksbeskyttelse', 'En høykvalitets voksbeskyttelse påføres, med ett års holdbarhet ved normal bruk.']];
function ServiceDetail({
  go
}) {
  const [tab, setTab] = React.useState('Slik gjør vi det');
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-sunken)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '48px var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "campaign"
  }, "Kampanje pris!"), /*#__PURE__*/React.createElement(Badge, null, "Prisgunstig alternativ")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-4xl)',
      letterSpacing: 'var(--ls-display)',
      lineHeight: 'var(--lh-tight)',
      color: 'var(--ink-900)',
      margin: 0
    }
  }, "Kepler lakkforsegling"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-lg)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-body)',
      maxWidth: 560
    }
  }, "Med Kepler Lakkforsegling f\xE5r du det du trenger av \xE5rlig vedlikehold til lakken p\xE5 bilen din, inkludert en grundig nedvask, fjerning av forurensningene med clay-sliping og polering for \xE5 korrigere normal slitasje."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(PriceTag, {
    from: true,
    was: "7.590,-",
    now: "3.990,-",
    size: "lg"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('contact')
  }, "Bestill time"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    icon: "call"
  }, "Ring 33 33 44 00")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, "* Vilk\xE5r og garantibestemmelser kan gjelde. Les mer om v\xE5re garantier her.")), /*#__PURE__*/React.createElement(ImageSlot, {
    src: "../../assets/photos/lakkforsegling-rod-bil.jpg",
    alt: "Lakkforsegling hos Kepler",
    height: 320
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ['Slik gjør vi det', 'Dette får du', 'Garanti'],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 56,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, tab === 'Slik gjør vi det' && /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gap: 24
    }
  }, STEPS.map(([t, d], i) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '48px 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-2xl)',
      background: 'var(--grad-chrome)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      margin: 0
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 4,
      fontSize: 'var(--fs-sm)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-body)'
    }
  }, d))))), tab === 'Dette får du' && /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gap: 14
    }
  }, ['Gir glans og dybde i lakken – fremhever bilens farge og gir en speilblank overflate.', 'Forurensning fjernes for å forebygge rustangrep.', 'Ett års holdbarhet ved normal bruk.', 'Tilfredsstiller bilprodusentenes krav om vedlikehold.'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 12,
      fontSize: 'var(--fs-md)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check_circle",
    size: 22,
    color: "var(--green-500)"
  }), t))), tab === 'Garanti' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Hos Kepler f\xE5r du garanti p\xE5 lakkforseglinger og understellsbehandlinger, og det f\xF8lger med garanti- og behandlingsbevis n\xE5r bilen din f\xE5r behandling hos oss."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Vi oppfordrer alle kunder til \xE5 oppbevare behandlings- og garantibeviser i bilen \u2013 ogs\xE5 ved salg, da aktive garantier fortsatt vil gjelde ved et eventuelt eierskifte."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      margin: '0 0 10px'
    }
  }, "Har du garanti hos andre akt\xF8rer?"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gap: 10
    }
  }, ['Vi overtar garantien – og du slipper å forholde deg til flere leverandører.', 'Vi følger opp med riktig produkt, til riktig tid.', 'Vi gir inntil 6 års garanti på videreføring.'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 12,
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check_circle",
    size: 20,
    color: "var(--green-500)"
  }), t)))))), /*#__PURE__*/React.createElement(Card, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      margin: 0
    }
  }, "Sammenlign beskyttelse"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      marginTop: 16
    }
  }, [['Kepler lakkforsegling', 'Voks, 1 år', 'fra 3.990,-'], ['Evershine Ultima', 'Keramisk', 'fra 9.990,-'], ['Evershine Graphene', 'Graphene, 6 år', 'fra 12.990,-'], ['Kepler Pure Grade', 'High-tech + polering', 'fra 15.990,-']].map(([n, d, p]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      alignItems: 'baseline',
      paddingBottom: 12,
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-sm)'
    }
  }, n), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-muted)'
    }
  }, d)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      whiteSpace: 'nowrap'
    }
  }, p))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ink-900)',
      color: 'var(--white)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "dark",
    eyebrow: "F\xD8R OG ETTER",
    title: "Resultatet kan dokumenteres",
    lead: "F\xF8r/etter-par er den sterkeste dokumentasjonen vi har. Bildene settes 50/50 med en tynn kromdeler. Bildene under er plassholdere til ekte f\xF8r/etter-par foreligger."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 2px 1fr',
      gap: 0,
      marginTop: 32,
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(ImageSlot, {
    src: "../../assets/photos/skumvask.jpg",
    alt: "F\xF8r",
    height: 280,
    radius: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--grad-chrome)'
    }
  }), /*#__PURE__*/React.createElement(ImageSlot, {
    src: "../../assets/photos/handtork-solvbil.jpg",
    alt: "Etter",
    height: 280,
    radius: 0
  })))));
}
Object.assign(window, {
  ServiceDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServiceDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Tag,
  ServiceCard,
  SectionHeading,
  Button
} = window.KeplerBilserviceDesignSystem_333da5;
const ALL = [{
  cat: 'Bilpleie',
  category: 'BILPLEIE',
  title: 'AC service',
  image: '../../assets/photos/kundeservice-desk.jpg',
  description: 'Rens av klimaanlegg for et sunt og friskt innemiljø i bilen.',
  was: '3.490,-',
  now: '1.990,-'
}, {
  cat: 'Beskyttelse',
  category: 'BESKYTTELSE',
  title: 'Evershine Felg Coating',
  image: '../../assets/photos/lakkarbeid-lofter.jpg',
  description: 'Felger er bilens smykke. Med Evershine Felg Coating får du penere felger og et enkelt vedlikehold i lang tid.',
  now: '2.490,-'
}, {
  cat: 'Beskyttelse',
  category: 'BESKYTTELSE',
  title: 'Evershine Glass Coating',
  image: '../../assets/photos/polering-frontrute.jpg',
  description: 'Klar og god sikt for en tryggere kjøretur. Coatingen gir en vannavvisende hinne på frontruten.',
  now: '1.490,-'
}, {
  cat: 'Smart Repair',
  category: 'SMART REPAIR',
  title: 'Felgreparasjon',
  image: '../../assets/photos/verksted-loftere.jpg',
  description: 'Vi reparerer kantkjørte felger raskt og profesjonelt – både lakkerte og maskinerte.',
  now: '2.990,-'
}, {
  cat: 'Antirust',
  category: 'LANOLINBASERT RUSTBESKYTTELSE',
  title: 'Fluid Film Express',
  image: '../../assets/photos/antirust-sproyting.jpg',
  description: 'Lanolin-basert rustbeskyttelse uten kompromiss! Suveren krypevne, selvhelende og 100 % miljøvennlig.',
  was: '4.990,-',
  now: '3.990,-',
  campaign: true
}, {
  cat: 'Antirust',
  category: 'UTVIDET UNDERSTELLSBEHANDLING',
  title: 'Fluid Film Pluss',
  image: '../../assets/photos/understellsbehandling.jpg',
  description: 'Vår mest omfattende Fluid Film-behandling, der innerskjermer og deksler demonteres for full tilgang.',
  now: '8.990,-'
}, {
  cat: 'Lakkforsegling',
  category: 'LAKKFORSEGLING',
  title: 'Graphene Keramisk coating',
  image: '../../assets/photos/handtork-solvbil.jpg',
  description: 'Evershine Graphene gir med sitt høye innhold av virkestoffer årevis med beskyttelse av lakken din.',
  now: '12.990,-',
  campaign: true
}, {
  cat: 'Antirust',
  category: 'GRATIS RUSTSJEKK',
  title: 'Gratis rustsjekk',
  image: '../../assets/photos/antirust-tekniker.jpg',
  description: 'En uforpliktende visuell kontroll av utsatte områder, og typiske problemområder for din bilmodell.',
  free: true
}, {
  cat: 'Bilpleie',
  category: 'BILPLEIE',
  title: 'Innvendig vask og rens',
  image: '../../assets/photos/klargjoring-hvit-bil.jpg',
  description: 'En grundig innvendig vask og rens av bilens interiør, tekstiler og overflater.',
  now: '6.190,-'
}, {
  cat: 'Lakkforsegling',
  category: 'PRISGUNSTIG ALTERNATIV',
  title: 'Kepler lakkforsegling',
  image: '../../assets/photos/lakkforsegling-rod-bil.jpg',
  description: 'Med Kepler Lakkforsegling får du det du trenger av årlig vedlikehold til lakken på bilen din!',
  was: '7.590,-',
  now: '3.990,-',
  campaign: true
}, {
  cat: 'Smart Repair',
  category: 'SMART REPAIR',
  title: 'PDR bulkoppretting',
  image: '../../assets/photos/smart-repair-front.jpg',
  description: 'Paintless Dent Remover (PDR) er en skånsom og effektiv metode for å fjerne bulker uten å skade bilens originale lakk.',
  now: '2.890,-'
}, {
  cat: 'Film og folie',
  category: 'FILM OG FOLIE',
  title: 'Xpel PPF beskyttelsesfilm',
  image: '../../assets/photos/skumvask.jpg',
  description: 'Passer for deg som ønsker å beskytte bilens utsatte områder på en rimelig og effektiv måte.',
  now: '2.990,-'
}];
const CATS = ['Alle', 'Bilpleie', 'Antirust', 'Beskyttelse', 'Lakkforsegling', 'Film og folie', 'Smart Repair'];
function Services({
  go
}) {
  const [cat, setCat] = React.useState('Alle');
  const list = cat === 'Alle' ? ALL : ALL.filter(s => s.cat === cat);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "V\xC5RE TJENESTER",
    title: "Bilpleietjenester",
    lead: "Kepler leverer et bredt spekter av bilpleietjenester og lakkbeskyttelse. Uansett hvilken tjeneste du trenger, kan du v\xE6re trygg p\xE5 at bilen er i de beste hender."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      margin: '32px 0 28px'
    }
  }, CATS.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: c === cat,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, list.map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s, {
    imageAlt: s.title,
    style: {
      cursor: 'pointer'
    },
    onClick: () => go('detail')
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: '20px 24px',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-lg)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)'
    }
  }, "* Vilk\xE5r og garantibestemmelser kan gjelde. Vi kan ogs\xE5 overta eller videref\xF8re eksisterende garantier du allerede har."));
}
Object.assign(window, {
  Services
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
