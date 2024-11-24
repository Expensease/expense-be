// types.d.ts
import 'express-session';
import { ObjectId } from 'mongodb';

import * as cookieSession from 'cookie-session';

declare module 'express-session' {
  interface SessionData {
    userId?: ObjectId;
    token?: string;
  }
}