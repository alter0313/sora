import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwrite = {
  endpoint:'https://cloud.appwrite.io/v1',
  Platform:'com.jsm.sora',
  projectId:'662f3af3001cac6a9188',
  databaseId:'662f3c07001e3845aec0',
  userCollectionId:'662f3c1c003b433ef7dc',
  videoCollectionId:'662f3c1c003b433ef7dc',
  storageId:'662f3ddb000609cca4dc'
  

}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwrite.endpoint) // Your Appwrite Endpoint
    .setProject(appwrite.projectId) // Your project ID
    .setPlatform(appwrite.Platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

// Register User
export async function createUser (username,email, password){
  try{
  const newAccount =  await account.create (
    ID.unique(),
    email,
    password,)
    username

     if(!newAccount) throw Error
     const avatarUrl = avatars.getInitials(username);

     await signIn(email, password);

     // saving users to dabase
     const newuserInDatabase = await databases.createDocument(appwrite.databaseId, appwrite.userCollectionId, ID.unique(), {
      accountId :newAccount.$id,
      email, username, avatar:avatarUrl
     })

     return newuserInDatabase;
  }
  catch(error){
  throw new Error(error)
}
}



export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
//get account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
// / Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
