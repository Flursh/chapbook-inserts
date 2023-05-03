import { dialog, dialogContent } from './dialog'

const dialogExtend:Dialog  = {
    ...engine.dialog,
    close: () => dialog.close(),
    showDialog : function showDialog(message:string, hideClose = false) {
        dialogContent.innerHTML = `<div class='message'>${message}</div>${!hideClose && `<button data-dialog='close'>close</button>`}`
        if (!dialog.open) dialog.showModal()
    }, showDialogError : function showDialogError(error = {message: 'unidentified error caught'}) {
        dialog.classList.add('dialog-error')
        dialogContent.innerHTML = `<div class='message'>${error.message}</div><button data-dialog='close'>close</button>`
        if (!dialog.open) dialog.showModal()
    }, showDialogInfo : function showDialogInfo(message:string) {
        dialog.classList.add('dialog-info')
        dialogContent.innerHTML = `<div class='message'>${message}</div><button data-dialog='close'>close</button>`
        if (!dialog.open) dialog.showModal()
    }, showDialogSuccess : function showDialogSuccess(message:string) {
        dialog.classList.add('dialog-success')
        dialogContent.innerHTML = `<div class='message'>${message}</div><button data-dialog='close'>close</button>`
        if (!dialog.open) dialog.showModal()
    }, showDialogWarning : function showDialogWarning(message:string) {
        dialog.classList.add('dialog-warning')
        dialogContent.innerHTML = `<div class='message'>${message}</div><button data-dialog='close'>close</button>`
        if (!dialog.open) dialog.showModal()
    }
}

export default dialogExtend;