import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import * as Google from "expo-google-app-auth";

import firebase from "firebase";
//import auth,{firebase} from "@react-native-firebase/auth"
//import db from "../config"

import {GoogleSignin} from "@react-native-community/google-signin"
//import { disableExpoCliLogging } from "expo/build/logs/Logs";

export default class Login extends Component {
  
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        try{
        firebase
          .auth()
          .signInWithCredential(credential)
         
            .then(user => {
              //after we have the credential - lets check if the user exists in firestore
              var docRef = firestore().collection('user').doc(auth().currentUser.uid);
  
              docRef.get()
              .then(doc => {
                  if (doc.exists) {
                  //user exists then just update the login time
                  return user
                  } else {
                  //user doesn't exist - create a new user in firestore
                  resolve(this.addNewUserToFirestore(user));
                  }
              })
              .catch(error => {
                  console.error('Checking if customer exists failed" ' + error);
              });
          })
          .catch(error => {
              console.error('GoogleSignIn to firebase Failed ' + error);
          })
        } catch (error) {
          console.log("Something generic went wrong, ", error )
      }
  }
//  .catch(error => {
  //    console.error('GoogleSignIn to firebase Failed ' + error);
  //})
    });
  };

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

  addNewUserToFirestore(user) {
    const collection = firestore().collection('user');
    const {profile} = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name,
      lastName: profile.family_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      //createdDtm: firestore.FieldValue.serverTimestamp(),
      //lastLoginTime: firestore.FieldValue.serverTimestamp(),
    };
    collection.doc(auth().currentUser.uid).set(details);
    return {user, details};
  }

  render() {
    /*if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.appIcon}
            ></Image>
            <Text style={styles.appTitleText}>{`Storytelling\nApp`}</Text>
          </View>*/
          return(
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}
            >
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
          //<View style={styles.cloudContainer}>
            //<Image
              //source={require("../assets/cloud.png")}
              //style={styles.cloudImage}
            //></Image>
          //</View>
        //</View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
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
    fontFamily: "Bubblegum-Sans"
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
    fontFamily: "Bubblegum-Sans"
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
