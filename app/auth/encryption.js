import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

bcrypt.setRandomFallback((len) => {
    const buf = new Uint8Array(len);
    return buf.map(() => Math.floor(isaac.random() * 256));
});

function encryptPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

function compare(password, hash){
    return bcrypt.compareSync(password, hash);
}

export {
    encryptPassword,
    compare,
}