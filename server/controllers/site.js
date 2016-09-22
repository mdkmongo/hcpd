import Site from '../models/site';

/**
 * Load site and append to req.
 */
function load(req, res, next, id) {
  Site.get(id).then((site) => {
    req.site = site;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get site
 * @returns {Site}
 */
function get(req, res) {
  return res.json(req.site);
}

/**
 * Create new site
 * @property {string} req.body.name - The name of site.
 * @returns {Site}
 */
function create(req, res, next) {
  const site = new Site({
    name: req.body.name
  });

  site.saveAsync()
    .then((savedSite) => res.json(savedSite))
    .error((e) => next(e));
}

/**
 * Update existing Site
 * @property {string} req.body.name - The name of site.
 * @returns {Site}
 */
function update(req, res, next) {
  const site = req.site;
  site.name = req.body.name;

  site.saveAsync()
    .then((savedSite) => res.json(savedSite))
    .error((e) => next(e));
}

/**
 * Get site list.
 * @property {number} req.query.skip - Number of sites to be skipped.
 * @property {number} req.query.limit - Limit number of sites to be returned.
 * @returns {Site[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Site.list({ limit, skip }).then((sites) =>	res.json(sites))
    .error((e) => next(e));
}

/**
 * Delete site.
 * @returns {Site}
 */
function remove(req, res, next) {
  const site = req.site;
  site.removeAsync()
    .then((deletedSite) => res.json(deletedSite))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };
