/* It would be OK to delete this file */ 

import { getPrettyDate, default_events } from './common.js';
function verdict(a, b, msg) {
    let pf = "FAIL"
    let isOk = false
    if (JSON.stringify(a) === JSON.stringify(b)) {
        pf = "PASS"
        isOk = true
    }
    console.log(`${pf} ${msg}`)
    return isOk
}


/* Dates are hard : Do they fit the format? */
function test_prettyDate() {
    const x = getPrettyDate()
    const regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/;
    const isMatch = regex.test(x);
    verdict(isMatch, true, "test_prettyDate " + x)
}

function test_default_events() {
    const expected = ["event", "created", "json"] 
    let isOk = true 
    for ( let title in default_events ) { 
        const obj = default_events[title]
        expected.forEach((k)=>{
            if ( ! obj.hasOwnProperty(k)) {
                isOk = false 
            }
        })
    }
    verdict(isOk, true, "test_default_events")
}

function runner() {
    test_prettyDate()
    test_default_events()
}
runner()




