import express from 'express';
import listingsCtrl from '../controllers/listing';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/')
  /** GET /api/listings/:siteId - Get site listings */
  .get(listingsCtrl.list);

  // Need to update listing

/** Load listings when API with siteId route parameter is hit */
router.param('siteId', listingsCtrl.list);

export default router;
