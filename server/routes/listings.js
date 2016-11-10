import express from 'express';
import listingsCtrl from '../controllers/listing';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/')
  /** GET /api/listings/:siteId - Get listings */
  .get(expressJwt({ secret: config.jwtSecret }), listingsCtrl.list)

  .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.createListing), listingsCtrl.create); // eslint-disable-line max-len

router.route('/:listingId')

  .get(listingsCtrl.get)

  /** PUT /api/sites/:listingId - Update listing */
  .put(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.updateListing), listingsCtrl.update) // eslint-disable-line max-len

  .delete(expressJwt({ secret: config.jwtSecret }), listingsCtrl.remove);

/** Load listings when API with siteId route parameter is hit */
router.param('listingId', listingsCtrl.load);

export default router;
