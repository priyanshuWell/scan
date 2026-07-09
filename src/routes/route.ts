import { Router } from 'express';
import { handleSmartRedirect } from '../controllers/redirect.controller.js';
import { createLink } from '../controllers/link.controller.js';

const router = Router();

// Smart Redirect (Must be before API routes to avoid conflicts)
router.get('/:slug', handleSmartRedirect);

// API Routes
router.post('/api/links', createLink);

export default router;
