import express from 'express';
import listingsCtrl from '../controllers/listing';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/')
  /** GET /api/listings/:siteId - Get site listings */
  .get(listingsCtrl.list)

  .post(validate(paramValidation.createListing), listingsCtrl.create);

router.route('/:listingId')

  .get(listingsCtrl.get)

  .delete(listingsCtrl.remove);

/** Load listings when API with siteId route parameter is hit */
router.param('listingId', listingsCtrl.load);

export default router;
