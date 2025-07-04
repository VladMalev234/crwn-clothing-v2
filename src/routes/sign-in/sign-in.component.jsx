import { signInWithGooglePopup, createUserDocFromAuth} from '../../utils/firebase/firebase.utils'

 const SignIn = () => {

    const logGoogleUser = async()=> {
        const response = await signInWithGooglePopup();
        await createUserDocFromAuth(response.user);
        
    }

  return (
    <div>
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  )
}

export default SignIn;

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2025, 7, 16);
//     }
//   }
// }