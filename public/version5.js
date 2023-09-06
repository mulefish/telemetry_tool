const MAIN_LOG_COLOR = 'background:lightblue';
function flattenCategoricalOptionalityObjects() {
  const flat = flatten(everything);
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat,
    null,
    2
  );
}

function flattenTransformationModule_defaultCategorizedEvents() {
  const flat = flatten(transformationModule.defaultCategorizedEvents);
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat,
    null,
    2
  );
}

function inflateFlatMap(simple) {
  const complex = {};
  for (const key in simple) {
    const levels = key.split('.');
    let currLevelObj = complex;
    for (let i = 0; i < levels.length; i++) {
      const levelKey = levels[i];
      if (!currLevelObj.hasOwnProperty(levelKey)) {
        currLevelObj[levelKey] = {};
      }
      if (i === levels.length - 1) {
        currLevelObj[levelKey] = simple[key];
      }
      currLevelObj = currLevelObj[levelKey];
    }
  }
  return complex;
}

function createObjectToSend(event) {
  const ary_of_keys_to_send = Object.keys(event['default']['payload']);
  const sendThis = {};
  ary_of_keys_to_send.forEach((key) => {
    const x = lookup[key];
    sendThis[key] = x;
  });
  return sendThis;
}

function setStore() {
  giveHumanSomeHappyFeedBack();
  const x = document.getElementById('editableJsonTextarea').value;
  localStorage.setItem('register1', x);
}

function getStore() {
  giveHumanSomeHappyFeedBack();
  const x = localStorage.getItem('register1');
  try {
    const obj = JSON.parse(x);
    document.getElementById('editableJsonTextarea').value = JSON.stringify(
      obj,
      null,
      2
    );
  } catch (ohno_bad_json) {
    document.getElementById('editableJsonTextarea').value = x;
  }
}

function beautifulJson(HoH) {
  let result = {};
  for (let k in HoH) {
    result[k] = inflateFlatMap(HoH[k]);
  }
  inflateFlatMap;
  return result;
}

function buildEventWhileIgnoringTheAutomaticallyGiven(flat_event_to_send) {
  let collector = {};
  const lam = flatten(everything['BASE_REQUIRED_LAM']['payload'], null, 2);
  for (let k in flat_event_to_send) {
    let isKeep = true;
    for (let k2 in lam) {
      if (k.startsWith(k2)) {
        isKeep = false;
      }
    }
    if (isKeep === true) {
      collector[k] = flat_event_to_send[k];
    }
  }
  return collector;
}

function reverseSortStringsOnLength(arr) {
  arr.sort(function (a, b) {
    return b.length - a.length;
  });
  return arr;
}

function upperCasify(aryOfStrings) {
  let result = [];
  aryOfStrings.forEach((thing) => {
    const pieces = thing.split('.');
    pieces[0] = pieces[0].toUpperCase();
    result.push(pieces.join('.'));
  });
  return result;
}
function superExpensiveMatch(flat_everything, array_of_almost_keys) {
  // Yes! This is crazy 'expensive'. But it is only 1 millisecond! So...
  let result = {};
  for (let keyWhichMightHaveQuestionMarks in flat_everything) {
    const candidate = keyWhichMightHaveQuestionMarks.replace(/\?/g, '');
    array_of_almost_keys.forEach((key) => {
      if (candidate === key) {
        result[candidate] = flat_everything[keyWhichMightHaveQuestionMarks];
      }
    });
  }
  return result;
}

function makeItRightShape(map, eventName) {
  // TODO: Talk with Shane and then remove this func.
  // This is part of the older 'everything automatic' idea
  if (eventName === 'error') {
    let errorObj = { error: {} };
    for (let k in map['EVENT']['attributes']) {
      const v = map['EVENT']['attributes'][k];
      errorObj['error'][k] = v;
    }
    return errorObj;
  } else if (eventName === 'general-component-event') {
    return map['EVENT'];
  } else if (eventName === 'product-interaction') {
    return map['EVENT'];
  } else if (eventName === 'purchase') {
    return map['EVENT']['attributes'];
  } else if (eventName === 'app-response') {
    return {
      event: {
        attributes: {
          details: 'this is optional details',
        },
      },
      id: 'this ID should be required',
    };
  } else if (eventName === 'page-products-displayed') {
    const productCollectionObject = {
      collectionList: [
        {
          id: 'pdp-recs-vertical-product-image',
          type: 'recommender',
          name: {
            unified: 'you-may-like',
            localized: 'You may like',
          },
          productList: [
            {
              categoryUnifiedId: 'somecategoryUnifiedId',
              unifiedId: 'someunifiedId',
              productId: 'abc123',
              skuList: [
                {
                  price: {
                    saleWithoutTaxShipping: '',
                    regularWithoutTaxShipping: '',
                    taxOnly: '',
                    isSale: false,
                    displaySale: '',
                    displayRegular: '',
                  },
                  quantity: -1,
                  size: 'small',
                  sku: 'sku123',
                },
              ],
            },
          ],
        },
      ],
    };

    return productCollectionObject;
  } else {
    return map;
  }
}

// function loadDefaultsIntoLocalStorageIfNeeded() {
// }

function getThisEvent(eventName) {
  const flat_everything = flatten(everything);

  let flat_object = flatten(
    everything['categoricalOptionalityObjects'][eventName]['default']['payload']
  );
  flat_object = buildEventWhileIgnoringTheAutomaticallyGiven(flat_object);
  let keys = Object.keys(flat_object);
  keys = reverseSortStringsOnLength(keys);
  keys = upperCasify(keys);
  const found = superExpensiveMatch(flat_everything, keys);
  const inflatedThing = inflateFlatMap(found);
  return inflatedThing;

  // TODO: Talk with Shane and then remove the below.
  // This is part of the older 'everything automatic' idea
  //const whatToSend = makeItRightShape(inflatedThing, eventName);
  //return whatToSend
  /* 
  currentEventName = eventName;
  document.getElementById('event').value = eventName;

  const transformThing = inflateFlatMap(
    transformationModule.defaultCategorizedEvents[eventName]['default']['$'][
      'payload'
    ]
  );
  */
  /* 
  const flat_transformThing = flatten(transformThing);
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat_transformThing,
    null,
    2
  );

  document.getElementById('editableJsonTextarea').value = JSON.stringify(
    whatToSend,
    null,
    2
  );
  */
}

function loadThisEvent(eventName) {
  document.getElementById('statusOfTheSend').innerHTML = '';
  document.getElementById('statusOfTheSend').style.backgroundColor = 'white';

  const flat_everything = flatten(everything);

  let flat_object = flatten(
    everything['categoricalOptionalityObjects'][eventName]['default']['payload']
  );
  flat_object = buildEventWhileIgnoringTheAutomaticallyGiven(flat_object);
  let keys = Object.keys(flat_object);
  keys = reverseSortStringsOnLength(keys);
  keys = upperCasify(keys);
  const found = superExpensiveMatch(flat_everything, keys);
  const inflatedThing = inflateFlatMap(found);
  const whatToSend = makeItRightShape(inflatedThing, eventName);

  currentEventName = eventName;
  document.getElementById('event').value = eventName;

  const transformThing = inflateFlatMap(
    transformationModule.defaultCategorizedEvents[eventName]['default']['$'][
      'payload'
    ]
  );
  const flat_transformThing = flatten(transformThing);
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat_transformThing,
    null,
    2
  );

  document.getElementById('editableJsonTextarea').value = JSON.stringify(
    whatToSend,
    null,
    2
  );
}

function showTdr() {
  const eventName = document.getElementById('event').value;

  const str = document.getElementById('editableJsonTextarea').value;
  let x = `analytics.trackEvent("${eventName}",${str}\n)`;

  document.getElementById('bottom_right_textArea').value = x;
}

async function sendIt() {
  document.getElementById('statusOfTheSend').innerHTML = '';
  document.getElementById('statusOfTheSend').style.backgroundColor = 'white';
  const eventName = document.getElementById('event').value;

  try {
    const x = JSON.parse(document.getElementById('editableJsonTextarea').value);
    const theResult = await MwaAnalytics.trackEvent(eventName, x);
    const base = theResult['payload']['properties'];
    thePayload =
      theResult['payload']['properties']['validationResult']['data']['payload'];
    document.getElementById('bottom_right_textArea').value = JSON.stringify(
      thePayload,
      null,
      2
    );
    // Got that back - now see if it was good or not
    const flat_payload = flatten(thePayload);
    let i = 0;
    for (let k in flat_payload) {
      const v = flat_payload[k];
      i++;
    }

    const whatGotSent = JSON.parse(
      document.getElementById('editableJsonTextarea').value
    );
    const flat_whatGotSent = flatten(whatGotSent);
    let simple = {};
    for (let k in flat_whatGotSent) {
      const v = flat_whatGotSent[k];
      const pieces = k.split('.');
      const k2 = pieces[pieces.length - 1];
      simple[k2] = v;
    }

    let isOk = [];
    for (let k in simple) {
      let v = simple[k];
      let itIsGood = false;
      for (let k2 in flat_payload) {
        const v2 = flat_payload[k2];
        if (v2 === v) {
          itIsGood = true;
        }
      }
      isOk.push(itIsGood);
    }
    const allTrue = isOk.every((v) => v === true);
    if (allTrue === false) {
      document.getElementById('statusOfTheSend').innerHTML = ' SUBMIT FAIL';
      document.getElementById('statusOfTheSend').style.backgroundColor = 'red';
    } else {
      giveHumanSomeHappyFeedBack();
      document.getElementById('statusOfTheSend').innerHTML = ' SUBMIT PASS';
      document.getElementById('statusOfTheSend').style.backgroundColor = 'cyan';
    }
  } catch (boom) {
    const msg =
      'FAILBOT!\n--------------------\nMaybe some needed field is missing\nMaybe the event is wrong\n--------------------\n' +
      boom.message;
    document.getElementById('bottom_right_textArea').value = msg;
    document.getElementById('statusOfTheSend').innerHTML = ' SUBMIT FAIL';
    document.getElementById('statusOfTheSend').style.backgroundColor = 'red';
  }
}

function log(msg) {
  if (typeof msg === 'object') {
    console.log('%c' + JSON.stringify(msg), MAIN_LOG_COLOR);
  } else {
    console.log('%c' + msg, MAIN_LOG_COLOR);
  }
}

function populateDropdown() {
  const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
  const events = JSON.parse(rawString);
  let keys = Object.keys(events);
  keys = keys.sort();
  const newOptionsData = [];
  keys.forEach((key) => {
    newOptionsData.push({ value: key, text: key });
  });
  const dropdown = document.getElementById('definedEventsSelector');
  dropdown.innerHTML = '';
  newOptionsData.forEach((option) => {
    const { value, text } = option;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.text = text;
    dropdown.appendChild(optionElement);
  });
}
function handleSelectChange() {
  document.getElementById('statusOfTheSend').innerHTML = '';
  document.getElementById('statusOfTheSend').style.backgroundColor = 'white';
  const dropdown = document.getElementById('definedEventsSelector');
  const selectedIndex = dropdown.selectedIndex;
  const selectedOption = dropdown.options[selectedIndex].value;
  const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
  const events = JSON.parse(rawString);
  const event = events[selectedOption];
  document.getElementById('title').value = selectedOption;
  document.getElementById('event').value = event.event;
  document.getElementById('creationDate').innerHTML = event.created;
  try {
    document.getElementById('editableJsonTextarea').value = JSON.stringify(
      event.json,
      null,
      2
    );
  } catch (ignore_because_it_might_not_be_json) {
    document.getElementById('editableJsonTextarea').value = event.json;
  }
}

function addNewThingIntoDroplist(title) {
  const dropdown = document.getElementById('definedEventsSelector');
  const newOption = document.createElement('option');
  newOption.value = title;
  newOption.text = title;
  dropdown.appendChild(newOption);
}

function save() {
  function addNewThingIntoDroplist(title) {
    const dropdown = document.getElementById('definedEventsSelector');
    const newOption = document.createElement('option');
    newOption.value = title;
    newOption.text = title;
    dropdown.appendChild(newOption);
    newOption.selected = true;
  }

  function setAsSelectedThisThing(title) {
    const dropdown = document.getElementById('definedEventsSelector');
    for (let i = 0; i < dropdown.options.length; i++) {
      const option = dropdown.options[i];
      if (option.value === title) {
        option.selected = true;
        break;
      }
    }
  }
  try {
    const wellFormedJson = document.getElementById(
      'editableJsonTextarea'
    ).value;
    if (beautify() === true) {
      const mightBeGood = {
        title: document.getElementById('title').value,
        event: document.getElementById('event').value,
        created: getPrettyDate(),
        json: wellFormedJson,
      };
      let isOk = true;
      const failures = [];
      for (let key in mightBeGood) {
        if (mightBeGood[key].length < 2) {
          failures.push(key);
          isOk = false;
        }
      }
      if (isOk === false) {
        alert(
          'You are missing fields\nNote: Need at least 1 char per field:\n' +
            JSON.stringify(failures)
        );
      } else {
        const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
        const events = JSON.parse(rawString);
        if (!events.hasOwnProperty(mightBeGood.title)) {
          addNewThingIntoDroplist(mightBeGood.title);
        } else {
          setAsSelectedThisThing(mightBeGood.title);
        }

        events[mightBeGood.title] = {
          event: mightBeGood.event,
          created: mightBeGood.created,
          json: JSON.parse(mightBeGood.json),
        };
        giveHumanSomeHappyFeedBack();
        localStorage.setItem(
          LOCAL_STORAGE_GLOBAL_EVENTS_KEY,
          JSON.stringify(events)
        );
      }
    }
  } catch (ouch) {
    alert(ouch);
  }
}

populateDropdown();
