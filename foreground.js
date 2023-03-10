container = document.querySelector('div[id="mastodon"]')
draftTextarea = container?.querySelector('textarea[class="autosuggest-textarea__textarea"][dir="auto"][aria-autocomplete="list"]')
tootBtn = container?.querySelector('button[class="button button--block"]')
notificationList = container?.querySelector('div[class="notification-list"]')

mountDrafter = () => {
    const STORAGE_DRAFT_KEY = 'tootdrafter_draft'

    // setting innerHTMl doesn't work because React overrides it
    const textareaSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set
    textareaSetter.call(draftTextarea, localStorage.getItem(STORAGE_DRAFT_KEY))
    draftTextarea.dispatchEvent(new Event('input', { bubbles: true }))

    const save =()=>localStorage.setItem(STORAGE_DRAFT_KEY, draftTextarea.value)
    // save content through Mutation Observer to listen to change by both the user & React
    new MutationObserver(save).observe(draftTextarea, { childList: true })
    // also save when upload fails
    new MutationObserver(save).observe(notificationList, { childList: true })

    // delete after sended
    tootBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_DRAFT_KEY)
    })
}

if (draftTextarea && tootBtn && notificationList) { // is Mastodon Web interface
    mountDrafter()
}
