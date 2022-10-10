import './tui-pagination.min.js';
import './tui-grid.min.js';
import './tui-date-picker.min.js';

const defaultGridOptions = {
  scrollX: true,
  scrollY: true,
  pageOptions: {
    useClient: true,
    perPage: 10,
  },
  bodyHeight: 'auto',
  rowHeight: 44,
};

tui.Grid.applyTheme('default', {
  cell: {
    focused: {
      border: 'transparent',
    },
    focusedInactive: {
      border: 'transparent',
    },
  },
  scrollbar: {
    border: '#e8e8e8',
    active: '#d2d2d2',
  },
});

tui.Grid.setLanguage('ko', {
  display: {
    noData: '데이터 없음',
  },
});

export function renderGrid(containerId, options) {
	const grid = new tui.Grid({
		el: document.getElementById(containerId),
		...defaultGridOptions,
		...options,
	});

	grid.on('afterPageMove', (ev) => {
		setTimeout(() => {
			grid.refreshLayout();
		}, 0);
	});

	return grid;
}

export class CustomGridInputCell {
  constructor(props) {
    const el = document.createElement('input');
    const config = props.columnInfo.editor ?? props.columnInfo.renderer;
    const {
      type = 'text',
      maxLength,
      minLength,
      max,
      min,
    } = config.options ?? {};
    const {
      columnInfo: { name },
      rowKey,
    } = props;

    el.className = 'grid-input';
    el.type = type;
    if (type == 'text') {
      maxLength != undefined && (el.maxLength = maxLength);
      minLength != undefined && (el.minLength = minLength);
    } else if (type == 'number') {
      max != undefined && (el.max = max);
      min != undefined && (el.min = min);
    }
    el.name = name;
    el.id = `${name}_${rowKey}`;

    el.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
    });

    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  render(props) {
    this.el.value = props.value;
  }
}

export class CustomGridSelectCell {
  constructor(props) {
    const el = document.createElement('select');
    const config = props.columnInfo.editor ?? props.columnInfo.renderer;
    const { listItems = [] } = config.options ?? {};
    const {
      columnInfo: { name },
      rowKey,
    } = props;

    el.className = 'grid-select';
    el.name = name;
    el.id = `${name}_${rowKey}`;

    el.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
    });

    this.el = el;

    listItems.forEach((item) => {
      const opt = document.createElement('option');
      opt.text = item.text;
      opt.value = item.value;
      this.el.options.add(opt);
    });

    this.render(props);
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  render(props) {
    this.el.value = props.value;
  }
}

export class CustomGridAnchorCell {
  constructor(props) {
    const el = document.createElement('a');
    const { linker, target } = props.columnInfo.renderer.options ?? {};
    const { value, rowKey, grid } = props;

    el.className = 'grid-link';
    el.innerHTML = value;
    target && (el.target = target);

    if (linker) {
      el.href = linker(grid.getRow(rowKey)); // callback function
    }

    el.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
    });

    this.el = el;

    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {}
}

export class CustomGridHeaderAddButton {
  constructor(props) {
    const el = document.createElement('button');

    el.className = 'icon-only grid-data-add';
    el.innerHTML = '';

    el.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
    });

    this.el = el;

    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {}
}

export class CustomGridButton {
  constructor(props) {
    const el = document.createElement('button');
    const { action, className } = props.columnInfo.renderer.options ?? {};
    const { value, rowKey, grid } = props;

    el.className = className;
    el.innerHTML = value;

    el.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
      action && action(grid.getRow(rowKey), rowKey);
    });

    this.el = el;

    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {}
}

export class CustomGridHeaderCheckbox {
  constructor(props) {
    const el = document.createElement('input');

    el.className = 'grid-check-all';
    el.type = 'checkbox';

    el.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
    });

    this.el = el;

    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {}
}

export class CustomGridCheckbox {
  constructor(props) {
    const el = document.createElement('input');
    const {
      columnInfo: { name },
      rowKey,
    } = props;

    el.className = 'grid-checkbox';
    el.type = 'checkbox';
    el.name = name;
    el.id = `${name}_${rowKey}`;

    el.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
    });

    this.el = el;

    this.render(props);
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  render(props) {
    this.el.value = props.value;
  }
}


