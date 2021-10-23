import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import * as Google from "expo-google-app-auth";
//import { GoogleSignin } from "@react-native-community/google-signin";
import firebase from "firebase";
//import { GoogleSignin } from "@react-native-community/google-signin";


export default class Login extends Component {

  // isUserEqual = (googleUser, firebaseUser) => {
  //   if (firebaseUser) {
  //     var providerData = firebaseUser.providerData;
  //     for (var i = 0; i < providerData.length; i++) {
  //       if (
  //         providerData[i].providerId ===
  //         firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
  //         providerData[i].uid === googleUser.getBasicProfile().getId()
  //       ) {
  //         // We don't need to reauth the Firebase connection.
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };

  onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      // Check if we are already signed-in Firebase with the correct user.
    
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result)=>{
              firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .get()
              .then(doc=>{
                if(doc.exists){
                  return result
                }else{
                 this.addNewUserToFirestore(result)
                }
              })

          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

  addNewUserToFirestore(user) {
    const collection = firebase.firestore().collection('users');
    const {profile} = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name,
      lastName: profile.family_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
    };
    collection.doc(firebase.auth().currentUser.uid).set(details);
    return {user, details};
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: "web",
        androidClientId:
        "250733362393-p5j4a9iromdva5qrnhqkblpiauln33gt.apps.googleusercontent.com",
      iosClientId:
        "250733362393-uc7gcnqq93d9na5s413e1aeqo057j64k.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.appTitle}>
            <Text style={styles.appTitleText}>{`Storytelling\nApp`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}
            >
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
//   droidSafeArea: {
//     marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
//   },
  appTitle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: "contain"
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),

  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white"
  },
  googleIcon: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: "contain"
  },
  googleText: {
    color: "black",
    fontSize: RFValue(20),
  },
  cloudContainer: {
    flex: 0.3
  },
  cloudImage: {
    position: "absolute",
    width: "100%",
    resizeMode: "contain",
    bottom: RFValue(-5)
  }
});
