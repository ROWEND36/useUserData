import { onAuthStateChanged } from "firebase/auth";
import createSubscription from "./createSubscription";
import { auth } from "./initFirebase";

export const [useUser, onUserChanged] = createSubscription(function (setUser) {
  return onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
    },
    function () {
      //Possible reason for recurrent signing out
      setUser(null);
    }
  );
});
export default useUser;
