const LOG_COLOR = "background:lightblue"

/* This will happen as soon as the page is loaded */
function setUpLocalstorage_and_tellChildWhatTheKeyIs() {
    const theLocalStoreage = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
    if (theLocalStoreage === null) {
        console.log(`%c CREATING ${LOCAL_STORAGE_GLOBAL_EVENTS_KEY}`, LOG_COLOR)
        localStorage.setItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY, JSON.stringify(default_events));
    } else {
        // TODO! SEE HERE!!!
        // Not sure if SMART or DUMB to always keep these...  Or... 
        // TODO: Talk with Shane and Dipali and Francis! 
        // BEGIN MAYBE!
        // GOAL: If a 'default has been zapped' put it back in. But if it has been changed then let it alone.
        const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY)
        const events = JSON.parse(rawString)
        let changed = 0 
        for ( let key in default_events ) {
            if ( ! events.hasOwnProperty(key)) {
                // Put it back! 
                events[key] = default_events[key]
                changed++
                console.log(`%c Adding back ${key} to factory settings`, LOG_COLOR)

            } else {
                // Keep it as is! Might be the same as the original. 
                // Might be different! Whatever. As is. 
            }
        }
        if ( changed > 0 ) {
            console.log(`%c CHANGING ${LOCAL_STORAGE_GLOBAL_EVENTS_KEY}`, LOG_COLOR)
            localStorage.setItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY, JSON.stringify(default_events));
        } else {
            console.log(`%c NO CHANGE ${LOCAL_STORAGE_GLOBAL_EVENTS_KEY}`, LOG_COLOR)
        }
    }
}
setUpLocalstorage_and_tellChildWhatTheKeyIs()

