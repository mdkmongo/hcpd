import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import siteRoutes from './site';
import listingsRoutes from './listings';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount site routes at /sites
router.use('/sites', siteRoutes);

// mount listing routes at /listings
router.use('/listings', listingsRoutes);

export default router;
