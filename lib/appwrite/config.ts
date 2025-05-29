import {ID, Account, Client, Functions, Avatars, Storage, Databases} from 'react-native-appwrite'
import { Platform } from 'react-native';





 export const appwriteConfig = {
   project: {
    url: process.env.EXPO_PUBLIC_APPWRITE_URL!,
    id: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platformIOS: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_IOS!,
    platformAndroid: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_ANDROID!,
    
   },

   databases: {
    users: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_USERS_DATABASE_ID!,
      collections: {
        creator: process.env.EXPO_PUBLIC_APPWRITE_CREATOR_COLLECTION_ID!,
        support: process.env.EXPO_PUBLIC_APPWRITE_SUPPORT_COLLECTION_ID!,
      },
    },

    posts: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_POSTS_DATABASE_ID!,
      collections: {
        creation: process.env.EXPO_PUBLIC_APPWRITE_CREATION_COLLECTION_ID!,
        project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!,
      },
    },

    comments: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_COMMENTS_DATABASE_ID!,
      collections: {
        comment: process.env.EXPO_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID!,
        feedback: process.env.EXPO_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID!,
        commentReply: process.env.EXPO_PUBLIC_APPWRITE_COMMENT_REPLY_COLLECTION_ID!,
        feedbackReply: process.env
          .EXPO_PUBLIC_APPWRITE_FEEDBACK_REPLY_COLLECTION_ID!,
      },
    },

    interactions: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_INTERACTIONS_DATABASE_ID!,
      collections: {
        save: process.env.EXPO_PUBLIC_APPWRITE_SAVE_COLLECTION_ID!,
        postLike: process.env.EXPO_PUBLIC_APPWRITE_POST_LIKE_COLLECTION_ID!,
        itemLike: process.env.EXPO_PUBLIC_APPWRITE_ITEM_LIKE_COLLECTION_ID!,
      },
    },

    communities: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_COMMUNITIES_DATABASE_ID!,
      collections: {
        discussion: process.env.EXPO_PUBLIC_APPWRITE_DISCUSSION_COLLECTION_ID!,
        member: process.env.EXPO_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!,
        community: process.env.EXPO_PUBLIC_APPWRITE_COMMUNITY_COLLECTION_ID!,
        topic: process.env.EXPO_PUBLIC_APPWRITE_TOPIC_COLLECTION_ID!,
        ping: process.env.EXPO_PUBLIC_APPWRITE_PING_COLLECTION_ID!,
        pinnedDiscussion: process.env
          .EXPO_PUBLIC_APPWRITE_PINNED_DISCUSSION_COLLECTION_ID!,
      },
    },

    conversations: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_CONVERSATIONS_DATABASE_ID!,
      collections: {
        conversation: process.env.EXPO_PUBLIC_APPWRITE_CONVERSATION_COLLECTION_ID!,
        message: process.env.EXPO_PUBLIC_APPWRITE_MESSAGE_COLLECTION_ID!,
      },
    },

    notifications: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_NOTIFICATIONS_DATABASE_ID!,
      collections: {
        userNotification: process.env
          .EXPO_PUBLIC_APPWRITE_USER_NOTIFICATION_COLLECTION_ID!,
        communityNotification: process.env
          .EXPO_PUBLIC_APPWRITE_COMMUNITY_NOTIFICATION_COLLECTION_ID!,
      },
    },

    events: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_EVENTS_DATABASE_ID!,
      collections: {
        event: process.env.EXPO_PUBLIC_APPWRITE_EVENT_COLLECTION_ID!,
        interestedEvents: process.env
          .EXPO_PUBLIC_APPWRITE_INTERESTED_EVENTS_COLLECTION_ID!,
      },
    },

    temps: {
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_TEMPS_DATABASE_ID!,
      collections: {
        vote: process.env.EXPO_PUBLIC_APPWRITE_VOTE_COLLECTION_ID!,
      },
    },

  },

  functions: {
    conversationPermission: process.env
      .EXPO_PUBLIC_APPWRITE_CONVERSATION_PERMISSION_FUNCTION_ID!,

    messagePermission: process.env
      .EXPO_PUBLIC_APPWRITE_MESSAGE_PERMISSION_FUNCTION_ID!,

    postLikePermission: process.env
      .EXPO_PUBLIC_APPWRITE_POST_LIKE_PERMISSION_FUNCTION_ID!,

    itemLikePermission: process.env
      .EXPO_PUBLIC_APPWRITE_ITEM_LIKE_PERMISSION_FUNCTION_ID!,

    savePermission: process.env.EXPO_PUBLIC_APPWRITE_SAVE_PERMISSION_FUNCTION_ID!,

    commentPermission: process.env
      .EXPO_PUBLIC_APPWRITE_COMMENT_PERMISSION_FUNCTION_ID!,

    feedbackPermission: process.env
      .EXPO_PUBLIC_APPWRITE_FEEDBACK_PERMISSION_FUNCTION_ID!,

    commentReplyPermission: process.env
      .EXPO_PUBLIC_APPWRITE_COMMENT_REPLY_PERMISSION_FUNCTION_ID!,

    feedbackReplyPermission: process.env
      .EXPO_PUBLIC_APPWRITE_FEEDBACK_REPLY_PERMISSION_FUNCTION_ID!,

    feedbackReplyParentPermission: process.env
      .EXPO_PUBLIC_APPWRITE_FEEDBACK_REPLY_PARENT_PERMISSION_FUNCTION_ID!,

    userNotificationPermission: process.env
      .EXPO_PUBLIC_APPWRITE_USER_NOTIFICATION_PERMISSION_FUNCTION_ID!,

    communityNotificationPermission: process.env
      .EXPO_PUBLIC_APPWRITE_COMMUNITY_NOTIFICATION_PERMISSION_FUNCTION_ID!,

    communityDiscussionPermission: process.env
      .EXPO_PUBLIC_APPWRITE_COMMUNITY_DISCUSSION_PERMISSION_FUNCTION_ID!,

    discussionLikePermission: process.env
      .EXPO_PUBLIC_APPWRITE_DISCUSSION_LIKE_PERMISSION_FUNCTION_ID!,

    discussionSavePermission: process.env
      .EXPO_PUBLIC_APPWRITE_DISCUSSION_SAVE_PERMISSION_FUNCTION_ID!,

    discussionItemLikePermission: process.env
      .EXPO_PUBLIC_APPWRITE_DISCUSSION_ITEM_LIKE_PERMISSION_FUNCTION_ID!,

    discussionCommentPermission: process.env
      .EXPO_PUBLIC_APPWRITE_DISCUSSION_COMMENT_PERMISSION_FUNCTION_ID!,

    discussionCommentReplyPermission: process.env
      .EXPO_PUBLIC_APPWRITE_DISCUSSION_COMMENT_REPLY_PERMISSION_FUNCTION_ID!,
  },

  storage: {
    creatorBucket: process.env.EXPO_PUBLIC_APPWRITE_CREATOR_BUCKET_ID!,
    creationBucket: process.env.EXPO_PUBLIC_APPWRITE_CREATION_BUCKET_ID!,
    projectBucket: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_BUCKET_ID!,
    communityBucket: process.env.EXPO_PUBLIC_APPWRITE_COMMUNITY_BUCKET_ID!,
    discussionBucket: process.env.EXPO_PUBLIC_APPWRITE_DISCUSSION_BUCKET_ID!,
    eventBucket: process.env.EXPO_PUBLIC_APPWRITE_EVENT_BUCKET_ID!,
  },

  oauth: {
    googleSuccessUrl: process.env.EXPO_PUBLIC_GOOGLE_SUCCESS_URL!,
    googleFailureUrl: process.env.EXPO_PUBLIC_GOOGLE_FAILURE_URL!,
  },

  encryption: {
    messageEncryption: process.env.EXPO_PUBLIC_APPWRITE_MESSAGE_ENCRYPTION_KEY!,
  },
   
    

}



//Appwrite Client Initialize
const appwriteClient = new Client();

appwriteClient
.setEndpoint(appwriteConfig.project.url) 
.setProject(appwriteConfig.project.id)

switch (Platform.OS) {
    case "ios":
        appwriteClient.setPlatform(appwriteConfig.project.platformIOS);
        break;
    case "android":
        appwriteClient.setPlatform(appwriteConfig.project.platformAndroid);
} 



export const account = new Account(appwriteClient);
export const functions = new Functions(appwriteClient);
export const avatars = new Avatars(appwriteClient);
export const storage = new Storage(appwriteClient);
export const databases = new Databases(appwriteClient);

