import { Client, Databases } from "react-native-appwrite";
import { Platform } from "react-native";

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_URL!,
    db: process.env.EXPO_PUBLIC_APPWRITE_USERS_DATABASE_ID!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    cl: {
        
        creators: process.env.EXPO_PUBLIC_APPWRITE_CREATOR_COLLECTION_ID!},
};

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

switch (Platform.OS) {
    case "ios":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_IOS!);
        break;
    case "android":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_ANDROID!);
}

const database = new Databases(client);

export { database, config, client };