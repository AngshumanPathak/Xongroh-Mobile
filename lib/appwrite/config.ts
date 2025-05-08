import {ID, Account, Client, Functions, Avatars, Storage, Databases} from 'appwrite'


interface DatabaseConfig {
    databaseId: string;
    collections: Record<string, string>;
  }
  
  interface AppwriteConfig {
    project: {
      id: string;
      url: string;
    };
  
    databases: {
      users: DatabaseConfig;
      posts: DatabaseConfig;
      comments: DatabaseConfig;
      interactions: DatabaseConfig;
      communities: DatabaseConfig;
      conversations: DatabaseConfig;
      notifications: DatabaseConfig;
      events: DatabaseConfig;
      temps: DatabaseConfig;
    };
  
    functions: {
      conversationPermission: string;
      messagePermission: string;
      postLikePermission: string;
      itemLikePermission: string;
      savePermission: string;
      commentPermission: string;
      feedbackPermission: string;
      commentReplyPermission: string;
      feedbackReplyPermission: string;
      feedbackReplyParentPermission: string;
      userNotificationPermission: string;
      communityNotificationPermission: string;
      communityDiscussionPermission: string;
      discussionLikePermission: string;
      discussionSavePermission: string;
      discussionItemLikePermission: string;
      discussionCommentPermission: string;
      discussionCommentReplyPermission: string;
    };
  
    storage: {
      creatorBucket: string;
      creationBucket: string;
      projectBucket: string;
      communityBucket: string;
      discussionBucket: string;
      eventBucket: string;
    };
  
    oauth: {
      googleSuccessUrl: string;
      googleFailureUrl: string;
    };
  
    encryption: {
      messageEncryption: string;
    };
  }



export const appwriteConfig: AppwriteConfig = {
   project: {
    url: process.env.APPWRITE_API_ENDPOINT!,
    id: process.env.APPWRITE_PROJECT_ID!
   },

   databases: {
    users: {
      databaseId: process.env.VITE_APPWRITE_USERS_DATABASE_ID!,
      collections: {
        creator: process.env.VITE_APPWRITE_CREATOR_COLLECTION_ID!,
        support: process.env.VITE_APPWRITE_SUPPORT_COLLECTION_ID!,
      },
    },

    posts: {
      databaseId: process.env.VITE_APPWRITE_POSTS_DATABASE_ID!,
      collections: {
        creation: process.env.VITE_APPWRITE_CREATION_COLLECTION_ID!,
        project: process.env.VITE_APPWRITE_PROJECT_COLLECTION_ID!,
      },
    },

    comments: {
      databaseId: process.env.VITE_APPWRITE_COMMENTS_DATABASE_ID!,
      collections: {
        comment: process.env.VITE_APPWRITE_COMMENT_COLLECTION_ID!,
        feedback: process.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID!,
        commentReply: process.env.VITE_APPWRITE_COMMENT_REPLY_COLLECTION_ID!,
        feedbackReply: process.env
          .VITE_APPWRITE_FEEDBACK_REPLY_COLLECTION_ID!,
      },
    },

    interactions: {
      databaseId: process.env.VITE_APPWRITE_INTERACTIONS_DATABASE_ID!,
      collections: {
        save: process.env.VITE_APPWRITE_SAVE_COLLECTION_ID!,
        postLike: process.env.VITE_APPWRITE_POST_LIKE_COLLECTION_ID!,
        itemLike: process.env.VITE_APPWRITE_ITEM_LIKE_COLLECTION_ID!,
      },
    },

    communities: {
      databaseId: process.env.VITE_APPWRITE_COMMUNITIES_DATABASE_ID!,
      collections: {
        discussion: process.env.VITE_APPWRITE_DISCUSSION_COLLECTION_ID!,
        member: process.env.VITE_APPWRITE_MEMBER_COLLECTION_ID!,
        community: process.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID!,
        topic: process.env.VITE_APPWRITE_TOPIC_COLLECTION_ID!,
        ping: process.env.VITE_APPWRITE_PING_COLLECTION_ID!,
        pinnedDiscussion: process.env
          .VITE_APPWRITE_PINNED_DISCUSSION_COLLECTION_ID!,
      },
    },

    conversations: {
      databaseId: process.env.VITE_APPWRITE_CONVERSATIONS_DATABASE_ID!,
      collections: {
        conversation: process.env.VITE_APPWRITE_CONVERSATION_COLLECTION_ID!,
        message: process.env.VITE_APPWRITE_MESSAGE_COLLECTION_ID!,
      },
    },

    notifications: {
      databaseId: process.env.VITE_APPWRITE_NOTIFICATIONS_DATABASE_ID!,
      collections: {
        userNotification: process.env
          .VITE_APPWRITE_USER_NOTIFICATION_COLLECTION_ID!,
        communityNotification: process.env
          .VITE_APPWRITE_COMMUNITY_NOTIFICATION_COLLECTION_ID!,
      },
    },

    events: {
      databaseId: process.env.VITE_APPWRITE_EVENTS_DATABASE_ID!,
      collections: {
        event: process.env.VITE_APPWRITE_EVENT_COLLECTION_ID!,
        interestedEvents: process.env
          .VITE_APPWRITE_INTERESTED_EVENTS_COLLECTION_ID!,
      },
    },

    temps: {
      databaseId: process.env.VITE_APPWRITE_TEMPS_DATABASE_ID!,
      collections: {
        vote: process.env.VITE_APPWRITE_VOTE_COLLECTION_ID!,
      },
    },

  },

  functions: {
    conversationPermission: process.env
      .VITE_APPWRITE_CONVERSATION_PERMISSION_FUNCTION_ID!,

    messagePermission: process.env
      .VITE_APPWRITE_MESSAGE_PERMISSION_FUNCTION_ID!,

    postLikePermission: process.env
      .VITE_APPWRITE_POST_LIKE_PERMISSION_FUNCTION_ID!,

    itemLikePermission: process.env
      .VITE_APPWRITE_ITEM_LIKE_PERMISSION_FUNCTION_ID!,

    savePermission: process.env.VITE_APPWRITE_SAVE_PERMISSION_FUNCTION_ID!,

    commentPermission: process.env
      .VITE_APPWRITE_COMMENT_PERMISSION_FUNCTION_ID!,

    feedbackPermission: process.env
      .VITE_APPWRITE_FEEDBACK_PERMISSION_FUNCTION_ID!,

    commentReplyPermission: process.env
      .VITE_APPWRITE_COMMENT_REPLY_PERMISSION_FUNCTION_ID!,

    feedbackReplyPermission: process.env
      .VITE_APPWRITE_FEEDBACK_REPLY_PERMISSION_FUNCTION_ID!,

    feedbackReplyParentPermission: process.env
      .VITE_APPWRITE_FEEDBACK_REPLY_PARENT_PERMISSION_FUNCTION_ID!,

    userNotificationPermission: process.env
      .VITE_APPWRITE_USER_NOTIFICATION_PERMISSION_FUNCTION_ID!,

    communityNotificationPermission: process.env
      .VITE_APPWRITE_COMMUNITY_NOTIFICATION_PERMISSION_FUNCTION_ID!,

    communityDiscussionPermission: process.env
      .VITE_APPWRITE_COMMUNITY_DISCUSSION_PERMISSION_FUNCTION_ID!,

    discussionLikePermission: process.env
      .VITE_APPWRITE_DISCUSSION_LIKE_PERMISSION_FUNCTION_ID!,

    discussionSavePermission: process.env
      .VITE_APPWRITE_DISCUSSION_SAVE_PERMISSION_FUNCTION_ID!,

    discussionItemLikePermission: process.env
      .VITE_APPWRITE_DISCUSSION_ITEM_LIKE_PERMISSION_FUNCTION_ID!,

    discussionCommentPermission: process.env
      .VITE_APPWRITE_DISCUSSION_COMMENT_PERMISSION_FUNCTION_ID!,

    discussionCommentReplyPermission: process.env
      .VITE_APPWRITE_DISCUSSION_COMMENT_REPLY_PERMISSION_FUNCTION_ID!,
  },

  storage: {
    creatorBucket: process.env.VITE_APPWRITE_CREATOR_BUCKET_ID!,
    creationBucket: process.env.VITE_APPWRITE_CREATION_BUCKET_ID!,
    projectBucket: process.env.VITE_APPWRITE_PROJECT_BUCKET_ID!,
    communityBucket: process.env.VITE_APPWRITE_COMMUNITY_BUCKET_ID!,
    discussionBucket: process.env.VITE_APPWRITE_DISCUSSION_BUCKET_ID!,
    eventBucket: process.env.VITE_APPWRITE_EVENT_BUCKET_ID!,
  },

  oauth: {
    googleSuccessUrl: process.env.VITE_GOOGLE_SUCCESS_URL!,
    googleFailureUrl: process.env.VITE_GOOGLE_FAILURE_URL!,
  },

  encryption: {
    messageEncryption: process.env.VITE_APPWRITE_MESSAGE_ENCRYPTION_KEY!,
  },
   
    

}


const appwriteClient = new Client();

appwriteClient
.setEndpoint(appwriteConfig.project.url) // Your API Endpoint
.setProject(appwriteConfig.project.id); // Your project ID



export const account = new Account(appwriteClient);
export const functions = new Functions(appwriteClient);
export const avatars = new Avatars(appwriteClient);
export const storage = new Storage(appwriteClient);
export const databases = new Databases(appwriteClient);