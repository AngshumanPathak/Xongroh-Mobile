import { INewUser, IUpdateUser } from "@/types";
import {useMutation, useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import { createUserAccount, createUserAccountWithGoogle, signInAccount, loginWithGoogle, signOutAccount } from "../appwrite/apis/users";
import { QUERY_KEYS } from "@/lib/tanstack/queryKeys";

export const useCreateUserAccountWithGoogle = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (session: any) => createUserAccountWithGoogle(session),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
    });
  };
  


  // *** AUTH QUERIES ***

// Use-Create-User-Account
export const useCreateUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
    onSuccess: () => {
      // Invalidate queries related to authentication after successful account creation
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

  // Use-Sign-In-Account
  export const useSignInAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
    });
  };
  
  // Use-Login-With-Google
  export const useLoginWithGoogle = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: loginWithGoogle,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
    });
  };
  
  // Use-Sign-Out
  export const useSignOutAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: signOutAccount,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
    });
  };
