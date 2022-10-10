import './tui-date-picker.min.js';

const defaultDatePickerOptions = {
  language: 'ko',
};

// Date Picker
export function renderDatePicker(containerId, options) {
  const [container] = $(`#${containerId} > .wrapper`);
  const [opener] = $(`#${containerId} .tui-ico-date`);
  const input = `#${containerId} .datepicker-input`;

  const datePicker = new tui.DatePicker(container, {
    date: new Date(),
    input: {
      element: input,
      format: 'yyyy-MM-dd',
    },
    openers: [opener],
    ...defaultDatePickerOptions,
    ...options,
  });

	datePicker.on('open', () => {
		$(input).addClass('focus');
	});
	datePicker.on('close', () => {
		$(input).removeClass('focus');
	});

	return datePicker;
}

// Date Range Picker
export function renderDateRangePicker(containerId, options) {
  const startContainer = `#${containerId} .startpicker-container`;
  const startInput = `#${containerId} .startpicker-input`;
  const endContainer = `#${containerId} .endpicker-container`;
  const endInput = `#${containerId} .endpicker-input`;
  const [opener] = $(`#${containerId} .tui-ico-date`);

  var today = new Date();
  const dateRangePicker = tui.DatePicker.createRangePicker({
    startpicker: {
      date: today,
      input: startInput,
      container: startContainer,
    },
    endpicker: {
      date: today,
      input: endInput,
      container: endContainer,
    },
    selectableRanges: [
      [
        today,
        new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),
      ],
    ],
    ...defaultDatePickerOptions,
    ...options,
  });

	const startPicker = dateRangePicker.getStartpicker();
	const endPicker = dateRangePicker.getEndpicker();
	
	startPicker.on('open', () => {
		$(startInput).addClass('focus');
	});
	startPicker.on('close', () => {
		$(startInput).removeClass('focus');
	});
	endPicker.on('open', () => {
		$(endInput).addClass('focus');
	});
	endPicker.on('close', () => {
		$(endInput).removeClass('focus');
	});

	$(`#${containerId} .tui-ico-date.start`).click(function() {
		startPicker.open();
	});

	$(`#${containerId} .tui-ico-date.end`).click(function() {
		endPicker.open();
	});

	return dateRangePicker;
}

// jQuery - select
$(function () {
  $('.form-select').selectmenu();
  $('.form-select-small').selectmenu({
    classes: {
      'ui-selectmenu-button': 'small',
      'ui-selectmenu-menu': 'small',
    },
  });
});
