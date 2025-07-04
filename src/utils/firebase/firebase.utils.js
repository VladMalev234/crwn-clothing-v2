import { initializeApp } from 'firebase/app';
import { getAuth,  
    signInWithRedirect,  
    signInWithPopup, 
    GoogleAuthProvider  } from 'firebase/auth';

     import {
        getFirestore,
        doc,
        getDoc,
        setDoc
    } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD12GmJTQyt-jKD6myFKnRUegsaKvpMXqM",
  authDomain: "crwn-clothing-db-9d642.firebaseapp.com",
  projectId: "crwn-clothing-db-9d642",
  storageBucket: "crwn-clothing-db-9d642.firebasestorage.app",
  messagingSenderId: "942943864952",
  appId: "1:942943864952:web:e01bf9b69370957dcf058d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// initialisation provider
const provider = new GoogleAuthProvider();
// при вході в GOOOLE завжди буде показувати вибір акаунту
provider.setCustomParameters({
    prompt: "select_account"
});

// Connecting auth
export const auth = getAuth();

// Функція для входу користувача через Google за допомогою спливаючого вікна (popup).
// Використовує Firebase Auth і GoogleAuthProvider.
// Після входу повертає об'єкт користувача (user).
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// підключення до бази
export const db = getFirestore();


export const createUserDocFromAuth = async (userAuth) => {
    // url на конретного зареєстрованого користувача
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    // для перевірки чи присутні у базі данні користувача
    const userSnapshot = await getDoc(userDocRef)

    console.log(userSnapshot);

     // if user data does not exist      
    if(!userSnapshot.exists()) {
        // дистуруктуризуємо данні користувача
        const {displayName, email} = userAuth;
        const createdAt = new Date();


        try {
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt
            });
        } catch (error) {
            console.log('error create the use', error);
            
        }
    }
    
    
  
    return userDocRef;
    
}