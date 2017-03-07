import pgp from '../base/pgp';
import config from '../../config';

export default pgp(config.db.url || config.db);
