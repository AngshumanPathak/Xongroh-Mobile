import {ID, Account, Client, Functions} from 'appwrite'






export const Config = {
    endpoint: process.env.APPWRITE_API_ENDPOINT,
    project: process.env.APPWRITE_PROJECT_ID

}


const appwriteClient = new Client();

appwriteClient
.setEndpoint(Config.endpoint!)
.setProject(Config.project!)



export const account = new Account(appwriteClient);
export const functions = new Functions(appwriteClient);