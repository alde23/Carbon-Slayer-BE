import {sha3_512} from 'js-sha3'

const generateSalt=():string=>{
    let result:string = "";
    const length:number = 128;
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}]|:;<,>.?/";
    const charactersLength:number = characters.length;
    let counter:number = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
export const hashPassword=(pw:string):string=>{
    const salt:string=generateSalt()
    let hashed = pw + salt
    for (let i = 0; i < 5; i++) {
        hashed = sha3_512(hashed);
    }
    return (hashed + salt);
}
export const unHashPassword=(pw:string,salt:string):string=>{
    let hashed = pw + salt
    for (let i = 0; i < 5; i++) {
        hashed = sha3_512(hashed);
    }
    return hashed + salt;
}

