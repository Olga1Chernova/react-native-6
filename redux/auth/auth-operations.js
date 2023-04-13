import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { auth } from '../../firebase/config';
import { authSlice } from './auth-reducer';
const { updateUser, isLoggedIn, logOut } = authSlice.actions;

export const signIn =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user)
    } catch (error) {
      console.log("error.message", error.message);
    }
};
  
export const signUp =
  ({ login, email, password }) =>
  async dispatch => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
      });
      const { uid, displayName } = auth.currentUser;
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email,
      };
      dispatch(updateUser(userUpdateProfile));
    } catch (error) {
      console.log(error.message);
    }
}
  
export const signOutUser = () => async dispatch => {
  await signOut(auth);
  dispatch(logOut());
}

export const authIsLoggedIn = () => async dispatch => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
      };
      dispatch(isLoggedIn({ isLoggedIn: true }));
      dispatch(updateUser(userUpdateProfile));
    }
  });
};