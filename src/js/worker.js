console.log('GGE adblocker Running ...')

const initIframeStyles = () => {
    document.body.innerHTML += `<style>
        #game:focus {
            width: 100vw !important;
            height: 100vh !important;
            marginTop: 0px !important;
        }
    </style>`
}

const toggleActiveStatus = (adblockerActive) => {
    try {
        if (adblockerActive) {
            console.log('GGE adblocker: Removing ads ...')
            document.getElementById('ad-placeholder-vertical')?.remove()
            document.getElementById('ad-placeholder-horizontal')?.remove()
            const game = document.getElementById('game')
            game.focus()
            console.log('GGE adblocker: Ads removed')
        } else {
    
        }
    } catch (error) {
        console.log(`GGE adblocker: Error removing ads`, error)
    }
}
const initialize = async () => {
    initIframeStyles()
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { _oldValue, newValue }] of Object.entries(changes)) {
            console.log(`GGE adblocker: ${key} changed from ${_oldValue} to ${newValue}`)
            if (key === 'adblockerActive') {
                toggleActiveStatus(newValue)
            }
        }
    })
    const adblockerActive = (await chrome.storage.local.get(["adblockerActive"])).adblockerActive
    toggleActiveStatus(adblockerActive)
}

if (document.readyState !== 'loading') {
    initialize()
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initialize()
    })
}
