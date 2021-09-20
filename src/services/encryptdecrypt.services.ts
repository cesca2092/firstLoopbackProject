const CryptoJS = require('crypto-js');
import {ServiceKeys as keys} from '../keys/service-keys';

export class EncryptDecrypt{
    type: string;
    constructor(type: string){
        this.type = type;
    }

    Encrypt(text:string){
        switch (this.type) {
            case keys.MD5:
                return CryptoJS.MD5(text).toString();

            case keys.AES:
                return CryptoJS.AES.encrypt(text,keys.AES_SECRET_KEY).toString();

            default:
                return "This type of crypt is not supproted";
        }
    }
}
