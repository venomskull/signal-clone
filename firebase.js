import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBTau4aRzEUe8LM8TKKt619uabuCNQNpXU",
    authDomain: "signal-clone-rn-8dfdc.firebaseapp.com",
    projectId: "signal-clone-rn-8dfdc",
    storageBucket: "signal-clone-rn-8dfdc.appspot.com",
    messagingSenderId: "373790033607",
    appId: "1:373790033607:web:98ac796ccdd5c1849fa0e2"
  };

  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};