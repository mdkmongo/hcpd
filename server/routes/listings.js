import express from 'express';
import listingsCtrl from '../controllers/listings';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/:siteId')
  /** GET /api/listings/:siteId - Get site listings */
  .get(listingsCtrl.get);

  // Need to update listing

/** Load listings when API with siteId route parameter is hit */
router.param('siteId', listingsCtrl.load);

export default router;
