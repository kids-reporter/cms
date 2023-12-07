const breakpoints = {
  small: 320,
  medium: 760,
  large: 1440,
}

const mediaFeature = {
  smallOnly: `(max-width: ${breakpoints.medium - 1}px)`,
  largeOnly: `(min-width: ${breakpoints.large}px)`,
}

const mediaQuery = {
  smallOnly: `@media ${mediaFeature.smallOnly}`,
  mediumOnly: `@media (min-width: ${breakpoints.medium}px) and (max-width: ${
    breakpoints.large - 1
  }px)`,
  mediumAbove: `@media (min-width: ${breakpoints.medium}px)`,
  largeBelow: `@media (max-width: ${breakpoints.large - 1}px)`,
  largeOnly: `@media ${mediaFeature.largeOnly}`,
}

export { breakpoints, mediaFeature, mediaQuery }
