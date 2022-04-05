import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from "firebase/auth";

export const reAuth = (password) => {
    const auth = getAuth();
    const user = auth.currentUser
    const credentials = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credentials)
}