import express from 'express';
const router = express.Router();
import { asyncHandler } from '../../utils/asyncHandler';
import { createUser, login, getSingleUser, saveBook, deleteBook } from '../../controllers/user-controller';
import { authenticateToken } from '../../middleware/auth';


export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

// import middleware
import { authenticateToken } from '../../services/auth.js';

const router = express.Router();
// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(asyncHandler(createUser)).put(authenticateToken, asyncHandler(saveBook));

router.route('/login').post(asyncHandler(login));

router.route('/me').get(authenticateToken, asyncHandler(getSingleUser));

router.route('/books/:bookId').delete(authenticateToken, asyncHandler(deleteBook));

export default router;
