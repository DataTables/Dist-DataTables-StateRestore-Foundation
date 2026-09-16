/*! StateRestore Foundation styling 2.0.1 for DataTables
 * Copyright (c) SpryMedia Ltd - datatables.net/license
 */

(function(factory){
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['datatables.net-zf', 'datatables.net-staterestore'], function (dt) {
			return factory(window, document, dt);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		var cjsRequires = function (root) {
			if (! root.DataTable) {
				require('datatables.net-zf')(root);
			}

			if (! window.DataTable.StateRestore) {
				require('datatables.net-staterestore')(root);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root) {
				if (! root) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				cjsRequires(root);
				return factory(root, root.document, root.DataTable);
			};
		}
		else {
			cjsRequires(window);
			module.exports = factory(window, window.document, window.DataTable);
		}
	}
	else {
		// Browser
		factory(window, document, window.DataTable);
	}
}(function(window, document, DataTable) {
'use strict';

var Dom = DataTable.Dom;
var util = DataTable.util;

let fModal;
let modalEl;
const StateRestore = DataTable.StateRestore;
function assertModal() {
    if (modalEl) {
        return;
    }
    modalEl = Dom.c('div')
        .classAdd('reveal reveal-modal dtsr-modal')
        .append(Dom.c('button')
        .classAdd('close-button')
        .attr({
        type: 'button',
        'aria-label': 'Close'
    })
        .append(Dom.c('span').attr('aria-hidden', 'true').html('&times;')))
        .append(Dom.c('div').classAdd('dtsr-modal-header').append(Dom.c('h4')))
        .append(Dom.c('div').classAdd('dtsr-modal-content'));
}
// Get the Bootstrap library either from it being registered on DataTables (i.e
// in an ESM environment), or on the window if present there.
function getFoundation() {
    let F = DataTable.use('foundation');
    let win = DataTable.use('win');
    if (F) {
        return F;
    }
    if (win.Foundation) {
        return win.Foundation;
    }
    throw new Error('No Foundation library. Set it with `DataTable.use(Foundation);`');
}
/*
 * Foundation modal for StateRestore.
 */
StateRestore.modal = function (title, content, className, closeCb) {
    assertModal();
    let $ = DataTable.use('jq');
    if (!fModal) {
        modalEl.appendTo('body');
        // Foundation depends on jQuery, so it must be set
        let Foundation = getFoundation();
        fModal = new Foundation.Reveal($(modalEl.get(0)), {
            closeOnClick: false
        });
    }
    let header = modalEl.find('div.dtsr-modal-header h4');
    let body = modalEl.find('div.dtsr-modal-content');
    let close = modalEl.find('button.close-button');
    // Display the content
    header.text(title);
    body.append(content);
    modalEl.classAdd(className);
    // Close event handler
    close.on('click.dtsr', () => {
        closeCb();
    });
    modalEl.on('click.dtsr', e => {
        if (Dom.s(e.target).classHas('modal')) {
            closeCb();
        }
    });
    fModal.open();
    $(document).on('click.dtsr', 'div.reveal-overlay', e => {
        if (!$(e.target).closest(modalEl.get(0)).length) {
            closeCb();
        }
    });
};
StateRestore.modalClean = function () {
    assertModal();
    let $ = DataTable.use('jq');
    let header = modalEl.find('div.dtsr-modal-header h4');
    let body = modalEl.find('div.dtsr-modal-content');
    let close = modalEl.find('button.close-button');
    header.text('');
    body.empty();
    modalEl.classRemove(StateRestore.classes.modal.table);
    close.off('.dtsr');
    modalEl.off('.dtsr');
    $(document).off('click.dtsr');
};
StateRestore.modalClose = function () {
    assertModal();
    if (fModal) {
        fModal.close();
    }
};
/*
 * Setup classes for integration
 */
util.object.assignDeep(StateRestore.classes, {
    field: {
        checkboxOption: 'dtsr-check-container',
        container: 'dtsr-field',
        error: 'error',
        info: 'dtsr-info',
        label: '',
        value: '',
        input: {
            checkbox: '',
            text: ''
        }
    },
    modal: {
        button: 'button',
        table: 'large'
    },
    table: {
        table: 'table hover',
        button: 'button secondary small'
    }
});


return DataTable;
}));
