import express from 'express';
import authRoutes from '@feat/auth/auth.route';
import hotelRoutes from '@feat/hotels/hotels.route';
import healthRoutes from '@feat/health/health.route';
import passport from '@feat/auth/passport';
import config from '@config/config';
import sessionConfig from '@config/sessionConfig';
import bodyParser from 'body-parser';

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.get('/api/health', healthRoutes);

app.listen(config.PORT, function () {
  console.log(`server is listening on port ${config.PORT}`);
});
