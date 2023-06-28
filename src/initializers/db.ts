import pgp from 'pg-promise';
import config from '@/config/config';

const pgpInstance = pgp();

const db = pgpInstance(config.DATABASE_URL!);

export default db;
