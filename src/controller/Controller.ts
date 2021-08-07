import * as bcrypt from 'bcryptjs';
import config from '../config/config';

class Controller {

    hashPassword(password){
       return bcrypt.hash(password, config.saltRounds);
    }

    comparePassword(passwordReceived, passwordSaved){
        return bcrypt.compare(passwordReceived, passwordSaved);
    }

}

export default Controller;