// const createAccount = async () => {
//     try {
//       await appwrite.account.create("unique()", email, password, name);
//       console.log("Successfully created account");
//       // You can add additional logic here, like navigating to the next screen
//     } catch (error) {
//       console.error("Error creating account:", error);
//       Alert.alert("Error", error.message);
//     }
//   };

//   // Sign in with email and password
//   const signIn = async () => {
//     try {
//       await appwrite.account.createEmailSession(email, password);
//       const userData = await appwrite.account.get();
//       setUserDetails(userData);
//       console.log(userDetails);
//       // You can add additional logic here, like navigating to the next screen
//     } catch (error) {
//       console.error("Error signing in:", error);
//       Alert.alert("Error", error.message);
//     }
//   };

//   // Sign out
//   const signOut = async () => {
//     try {
//       await appwrite.account.deleteSessions();
//       setUserDetails(null);
//       console.log("Successfully signed out");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       Alert.alert("Error", error.message);
//     }
//   };