import Site from '../models/site';

/**
 * Load site and append listings to req.
 */
function load(req, res, next, id) {
  Site.get(id).then((site) => {
    req.listings = site.listings;    // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get site
 * @returns {Site}
 */
function get(req, res) {
  return res.json(req.listings);
}

export default { load, get };
