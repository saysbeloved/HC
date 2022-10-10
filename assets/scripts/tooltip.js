import './tippy-popper.min.js';
import './tippy-bundle.umd.min.js';

export function tooltip(id, content, useHtml = false) {
  return tippy(id, {
    theme: 'light-border',
    placement: 'bottom',
    animation: 'scale',
    content: content,
    allowHTML: useHtml,
  });
}
