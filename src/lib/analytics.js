/**
 * analytics.js
 *
 * Thin wrapper around the GTM dataLayer.
 *
 * Everything downstream (GA4, Meta Pixel) is configured inside the GTM
 * container — this file only emits well-named events so tags can be wired
 * without another site deploy.
 *
 * NOTE: ticket checkout happens inside a cross-origin iframe
 * (app.rfidify.com), so no purchase event can ever be observed from here.
 * The deepest signal available on this domain is "opened the ticket modal
 * and stayed in it", which is what these events capture.
 */

/* UTM/click params worth carrying onto every event */
const CAMPAIGN_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
];

const STORAGE_KEY = 'bb_campaign';

/**
 * Read campaign params from the current URL, falling back to the ones stored
 * earlier in this session. Ad clicks land with the params; later events in the
 * same visit still need to be attributable.
 */
function resolveCampaign() {
  let stored = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl = {};
  for (const key of CAMPAIGN_PARAMS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  if (Object.keys(fromUrl).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      /* private mode — attribution degrades to URL-only, not worth failing on */
    }
    return fromUrl;
  }

  return stored;
}

/**
 * Push an event onto the dataLayer, stamped with campaign attribution.
 *
 * @param {string} event  dataLayer event name, used as the GTM trigger
 * @param {object} [data] additional event parameters
 */
export function track(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...resolveCampaign(), ...data });
}
