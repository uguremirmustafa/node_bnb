import session from 'express-session';
import config from './config';

const sessionConfig = session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // TODO: session store conf
});

export default sessionConfig;
