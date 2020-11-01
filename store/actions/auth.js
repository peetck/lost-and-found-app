import firebase from "firebase";

export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";

export const autoLogin = (user) => {
  return async (dispatch) => {
    const ref = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();
    const userData = ref.data();

    dispatch({
      type: SET_USER,
      userData: {
        email: userData.email,
        nickname: userData.nickname,
        imageUrl: userData.imageUrl,
      },
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const ref = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();

    const userData = ref.data();

    dispatch({
      type: SET_USER,
      userData: {
        email: userData.email,
        nickname: userData.nickname,
        imageUrl: userData.imageUrl,
      },
    });
  };
};

export const signUp = (email, password, nickname, image) => {
  return async (dispatch) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    let fileName = "user_default.png";
    let ref = firebase.storage().ref().child("user_image");

    if (image) {
      const file = await fetch(image);
      const fileBlob = await file.blob();
      fileName = user.uid + ".jpg";
      await ref.child(fileName).put(fileBlob);
    }

    const imageUrl = await ref.child(fileName).getDownloadURL();
    await firebase.firestore().collection("users").doc(user.uid).set({
      email: email,
      nickname: nickname,
      imageUrl: imageUrl,
    });

    dispatch({
      type: SET_USER,
      userData: {
        email: email,
        nickname: nickname,
        imageUrl: imageUrl,
      },
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
    });
  };
};
