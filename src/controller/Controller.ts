import * as bcrypt from 'bcryptjs';
import config from '../config/config';

class Controller {

    hashPassword(password){
       return bcrypt.hash(password, config.saltRounds);
    }

}

export default Controller;