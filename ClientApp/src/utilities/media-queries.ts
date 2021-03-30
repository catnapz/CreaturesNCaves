/**
 * These constants are to be used with the useMediaQuery hook provided by react-responsive
 * when component logic is different depending on screen size.
 * Note: Use bootstrap media query sass mixins instead when only style changes required.
 *
 * Breakpoints reflect those used by bootstrap:
 *     https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints
 */

const minWidth = {
  // Small devices (landscape phones, 576px and up)
  SM: "(min-width: 576px)",

  // Medium devices (tablets, 768px and up)
  MD: "(min-width: 768px)",

  // Large devices (desktops, 992px and up)
  LG: "(min-width: 992px)",

  // Extra large devices (large desktops, 1200px and up)
  XL: "(min-width: 1200px)",
};

const maxWidth = {
  // Extra small devices (portrait phones, less than 576px)
  XS: "(max-width: 575.98px)",

  // Small devices (landscape phones, less than 768px)
  SM: "(max-width: 767.98px)",

  // Medium devices (tablets, less than 992px)
  MD: "(max-width: 991.98px)",

  // Large devices (desktops, less than 1200px)
  LG: "(max-width: 1199.98px)",
};

export { minWidth, maxWidth };
