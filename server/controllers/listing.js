import Listing from '../models/listing';

/**
 * Load listing and append listing to req.
 */
function load(req, res, next, id) {
  Listing.get(id).then((listing) => {
    req.listing = listing;    // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get listings
 * @returns {Listing}
 */
function get(req, res) {
  return res.json(req.listings);
}

/**
 * Get listing list.
 * @property {number} req.query.skip - Number of listings to be skipped.
 * @property {number} req.query.limit - Limit number of listings to be returned.
 * @returns {Listing[]}
 */
function list(req, res, next) {
  const { limit = 1000, skip = 0, siteId = '' } = req.query;
  Listing.list({ limit, skip, siteId }).then((listings) => res.json(listings))
    .error((e) => next(e));
}

export default { load, get, list };
