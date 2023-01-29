container = document.querySelector('div[id="mastodon"]')
draftTextarea = container?.querySelector('textarea[class="autosuggest-textarea__textarea"][dir="auto"][aria-autocomplete="list"]')
tootBtn = container?.querySelector('button[class="button button--block"]')

mountDrafter = () => {
    const STORAGE_DRAFT_KEY = 'tootdrafter_draft'

    // setting innerHTMl doesn't work because React overrides it
    const textareaSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set
    textareaSetter.call(draftTextarea, localStorage.getItem(STORAGE_DRAFT_KEY))
    draftTextarea.dispatchEvent(new Event('input', { bubbles: true }))

    draftTextarea.addEventListener('change', event => {
        localStorage.setItem(STORAGE_DRAFT_KEY, event.target.value)
    })
 
    tootBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_DRAFT_KEY)
    })
}

if (draftTextarea && tootBtn) { // is a Mastodon Web interface
    mountDrafter()
}
