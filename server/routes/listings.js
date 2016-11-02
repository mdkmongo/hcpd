import express from 'express';
import listingsCtrl from '../controllers/listing';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/')
  /** GET /api/listings/:siteId - Get site listings */
  .get(listingsCtrl.list)

  .post(listingsCtrl.create);

/** Load listings when API with siteId route parameter is hit */

export default router;
