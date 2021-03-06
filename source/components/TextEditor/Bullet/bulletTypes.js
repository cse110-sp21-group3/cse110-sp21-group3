/**
 * Symbols for each type of bullet.
 */
export const bulletTypes = {
  none: '',
  task: '&bull;',
  note: '&ndash;',
  event: '&#9702;',
  theme: '&#11088;',
};

/**
 * CSS to add for each variation of bullet.
 */
export const bulletModifiers = {
  none: {
    'font-style': 'normal',
    'font-weight': 'normal',
  },
  priority: {
    'font-style': 'normal',
    'font-weight': 'bold',
  },
  inspiration: {
    'font-style': 'italic',
    'font-weight': 'normal',
  },
};
