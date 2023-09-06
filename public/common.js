/* NOTE: Both index.html and modal.html share a bunch of code logic. Here is where to put common stuff */
/* TODO: Port whatever funcs that do not use or set DOM things into here */

const COMMON_LOG_COLOR = 'background:tan';

function getPrettyDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function beautify() {
  try {
    giveHumanSomeHappyFeedBack();

    const rawString = document.getElementById('editableJsonTextarea').value;
    const pretty = JSON.parse(rawString);
    document.getElementById('editableJsonTextarea').value = JSON.stringify(
      pretty,
      null,
      2
    );
    return true;
  } catch (your_json_is_ugly) {
    alert(
      'Your json is illformed\nOr it is empty!\n---------\n' +
        your_json_is_ugly.message
    );
    return false;
  }
}

function giveHumanSomeHappyFeedBack() {
  const node = document.getElementById('feedback');
  node.style.backgroundColor = 'lightgreen';
  setTimeout(() => {
    node.style.backgroundColor = '';
  }, 500);
}

const default_events = {
  'app-response': {
    event: 'app-response',
    created: getPrettyDate(),
    json: {
      event: {
        attributes: {
          details: 'this is optional details',
        },
      },
      id: 'this ID should be required',
    },
  },
  error: {
    event: 'error',
    created: getPrettyDate(),
    json: {
      error: {
        errorMessage: 'string',
        errorType: 'string',
        errorDetails: 'string',
      },
    },
  },
  'general-component-event': {
    event: 'general-component-event',
    created: getPrettyDate(),
    json: {
      component: {
        id: 'string',
        type: 'string',
        text: 'string',
      },
    },
  },
  'page-products-displayed': {
    event: 'page-products-displayed',
    created: getPrettyDate(),
    json: {
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
    },
  },
  'page-view': {
    event: 'page-view',
    created: getPrettyDate(),
    json: {},
  },
  // INTENTIONALLY NOT HERE TO test dynamic loading
  'product-interaction': {
    event: 'product-interaction',
    created: getPrettyDate(),
    json: {
      component: {
        id: 'string',
        type: 'string',
        text: 'string',
      },
    },
  },
  // INTENTIONALLY NOT HERE TO test dynamic loading
  purchase: {
    event: 'purchase',
    created: getPrettyDate(),
    json: {
      orderId: 'string',
    },
  },
  // INTENTIONALLY Stupid to test impossible event FAIL mode
  kittycats: {
    event: 'test',
    created: getPrettyDate(),
    json: {
      this_is_not_real: 'string',
      'random_to_check_for_persistence(sic)': Math.random(),
    },
  },
};

// COMMENT OUT FOR TDD!
// Vanilla web JS does not like exports!
// export { getPrettyDate, default_events };
