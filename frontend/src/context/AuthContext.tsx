
import React, { useContext } from "react";
import * as apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";

export type AuthContextType={
    isLoggedIn:boolean;
    refetchToken:()=>void;
    isLoading: boolean;
}

const AuthContext=React.createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider =({children}:{children:React.ReactNode})=>{
    const {isError,refetch,isLoading} = useQuery({
        queryKey:['validateToken'],
        queryFn:apiClient.verifyToken,
        retry:false,
    })
   
    return (
        <AuthContext.Provider value={{
            isLoggedIn:!isError && !isLoading,
            refetchToken:refetch,
            isLoading,
        }}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAppContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AuthContextProvider");
  }
  return context;
};