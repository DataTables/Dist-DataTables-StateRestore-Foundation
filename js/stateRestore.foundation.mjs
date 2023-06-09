/*! Bootstrap integration for DataTables' StateRestore
 * © SpryMedia Ltd - datatables.net/license
 */

import jQuery from 'jquery';
import DataTable from 'datatables.net-zf';
import StateRestore from 'datatables.net-staterestore';

// Allow reassignment of the $ variable
let $ = jQuery;

$.extend(true, DataTable.StateRestoreCollection.classes, {
    checkBox: 'dtsr-check-box form-check-input',
    checkLabel: 'dtsr-check-label form-check-label',
    checkRow: 'dtsr-check-row form',
    creationButton: 'dtsr-creation-button button',
    creationForm: 'dtsr-creation-form modal-body',
    creationText: 'dtsr-creation-text modal-header',
    creationTitle: 'dtsr-creation-title modal-title',
    nameInput: 'dtsr-name-input form-control',
    nameLabel: 'dtsr-name-label form-label',
    nameRow: 'dtsr-name-row medium-6 cell'
});
$.extend(true, DataTable.StateRestore.classes, {
    confirmationButton: 'dtsr-confirmation-button button'
});


export default DataTable;
