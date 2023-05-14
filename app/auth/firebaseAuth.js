import {PhoneAuthProvider, signInWithCredential} from "firebase/auth";

const verityUser = () => {
   
}

const sendOTP = (phoneNumber, recaptchaRef, auth) => {
    // return new Promise((res, rej) => {
    //     setTimeout(() => {
    //         res("1234");
    //     },1000);
    // });
    const phoneProvider = new PhoneAuthProvider(auth);
    return phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaRef.current);
}

const verifyOTP = (otp, verificationId, auth) => {
    // return new Promise((res, rej) => {
    //     setTimeout(() => {
    //         res("1234");
    //     },1000);
    // });
    const credential = PhoneAuthProvider.credential(verificationId,otp);
    return signInWithCredential(auth,credential);
}


export {
    verityUser,
    verifyOTP,
    sendOTP
} 