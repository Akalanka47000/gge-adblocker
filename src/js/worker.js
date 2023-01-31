console.log('GGE adblocker Running ...')

let firstLoad = false

const initIframeStyles = () => {

}

const toggleActiveStatus = (adblockerActive) => {
    try {
        if (adblockerActive) {
            document.getElementById('ad-placeholder-vertical')?.remove()
            document.getElementById('ad-placeholder-horizontal')?.remove()
            document.head.innerHTML += `<style id="iframe-style-override">
                #game {
                    width: 100vw !important;
                    height: 100vh !important;
                    margin-top: 0px !important;
                }
            </style>`
        } else {
            document.getElementById('iframe-style-override')?.remove()
        }
    } catch (error) {
        console.error(`GGE adblocker: Error removing ads - message: ${error.message}`, error)
    }
}
const initialize = async () => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { _oldValue, newValue }] of Object.entries(changes)) {
            console.log(`GGE adblocker: ${key} changed from ${_oldValue} to ${newValue}`)
            if (key === 'adblockerActive') {
                toggleActiveStatus(newValue)
            }
        }
    })
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(async () => {
        if (!firstLoad && document.getElementById('game') && document.getElementById('ad-placeholder-vertical') && document.getElementById('ad-placeholder-horizontal')) {
            firstLoad = true
            const adblockerActive = (await chrome.storage.local.get(["adblockerActive"])).adblockerActive
            toggleActiveStatus(adblockerActive)
            observer.disconnect()
        }
    });
    observer.observe(document, {
        subtree: true,
        attributes: true
    });
}


if (document.readyState !== 'loading') {
    initialize()
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initialize()
    })
}
