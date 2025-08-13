import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Constants";
import { api } from "./api";
import { BlogStepperContext } from "./context";
import {
  GenericError,
  GenericResponse,
  HomeCoursesType,
  PartnerMiscData,
  PartnerProfileType,
  UserAuthResponse,
} from "./types";
import { mutationErrorHandler, sleep } from "./utils";

type UseUserArgs = {
  extraOnSuccess?: () => void;
};

export function useUser({ extraOnSuccess = () => null }: UseUserArgs = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Query for fetching the current user
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserAuthResponse | null>({
    queryKey: ["auth"],
    queryFn: async () => {
      const authObject = queryClient.getQueryData<UserAuthResponse>(["auth"]); // Retrieve token from cache
      if (authObject?.user.role !== "STUDENT") return null;
      return authObject ?? null;
    },
    staleTime: 1000 * 60 * 6, // Prevent unnecessary refetching,
  });

  // Mutation for signing in
  const { mutate: signInUser, isPending: isSigningIn } = useMutation<
    GenericResponse<UserAuthResponse>,
    AxiosError<GenericError>,
    {
      email: string;
      password: string;
    },
    unknown
  >({
    mutationFn: async (data) => {
      await sleep(500);
      const response = await api().post<GenericResponse<UserAuthResponse>>(
        API_URL + "/auth/sign-in",
        data,
      );
      return response.data; // API response structure
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["auth"], data); // Cache the token globally;
      extraOnSuccess();
    },
    onError: (error) => {
      mutationErrorHandler(error);
      queryClient.setQueryData(["auth"], null);
    },
  });

  return {
    user,
    isLoading,
    isError,
    isSigningIn,
    signIn: signInUser,
    signOut: () => {
      queryClient.setQueryData(["auth"], null);
      navigate("/login");
    },
  };
}

export function usePartner({ extraOnSuccess = () => null }: UseUserArgs = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Query for fetching the current user
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<UserAuthResponse<"PARTNER"> | null, AxiosError<GenericError>>({
    queryKey: ["partnerAuth"],
    queryFn: async () => {
      const authObject = queryClient.getQueryData<UserAuthResponse<"PARTNER">>([
        "partnerAuth",
      ]); // Retrieve token from cache
      if (authObject?.user.role !== "PARTNER") return null;
      return authObject ?? null;
    },
    staleTime: 1000 * 60 * 6,
  });

  // Mutation for signing in
  const { mutate: signInUser, isPending: isSigningIn } = useMutation<
    GenericResponse<UserAuthResponse<"PARTNER">>,
    AxiosError<GenericError>,
    {
      email: string;
      password: string;
    },
    unknown
  >({
    mutationFn: async (data) => {
      const response = await api().post<
        GenericResponse<UserAuthResponse<"PARTNER">>
      >(API_URL + "/partner/auth/sign-in", data);
      return response.data; // API response structure
    },
    onSuccess: ({ data }) => {
      console.log("🚀 ~ useUserPartner ~ data:", data);
      queryClient.setQueryData(["partnerAuth"], data); // Cache the token globally;
      extraOnSuccess();
    },
    onError: (errors) => {
      mutationErrorHandler(errors);
      queryClient.setQueryData(["partnerAuth"], null);
    },
  });

  return {
    user,
    isLoading,
    isError,
    error,
    isSigningIn,
    signIn: signInUser,
    signOut: () => {
      navigate("/partner/signin");
      queryClient.setQueryData(["partnerAuth"], null);
      queryClient.invalidateQueries({ queryKey: ["partner"] });
      // queryClient.setQueriesData({ queryKey: ["partner"] }, null);
    },
  };
}

export function useAdmin({ extraOnSuccess = () => null }: UseUserArgs = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Query for fetching the current user
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserAuthResponse<"ADMIN"> | null>({
    queryKey: ["adminAuth"],
    queryFn: async () => {
      const authObject = queryClient.getQueryData<UserAuthResponse<"ADMIN">>([
        "adminAuth",
      ]); // Retrieve token from cache
      if (authObject?.user.role !== "ADMIN") return null;
      return authObject ?? null;
    },
    staleTime: 1000 * 60 * 6, // Prevent unnecessary refetching,
  });

  // Mutation for signing in
  const { mutate: signInUser, isPending: isSigningIn } = useMutation<
    GenericResponse<UserAuthResponse<"ADMIN">>,
    AxiosError<GenericError>,
    {
      email: string;
      password: string;
    },
    unknown
  >({
    mutationFn: async (data) => {
      await sleep(500);
      const response = await api().post(API_URL + "/admin/auth/sign-in", data);
      return response.data; // API response structure
    },
    onSuccess: ({ data }) => {
      console.log("🚀 ~ useAdmin ~ data:", data);
      queryClient.setQueryData(["adminAuth"], data); // Cache the token globally;
      extraOnSuccess();
    },
    onError: (error) => {
      mutationErrorHandler(error);
      queryClient.setQueryData(["adminAuth"], null);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  return {
    user,
    isLoading,
    isError,
    isSigningIn,
    signIn: signInUser,
    signOut: () => {
      navigate("/admin/signin");
      queryClient.setQueryData(["adminAuth"], null);
      // queryClient.setQueryData(["admin"], null);
    },
  };
}

export const useBlogStepper = () => {
  const context = useContext(BlogStepperContext);
  if (context === undefined) {
    throw new Error("useBlogStepper must be used within a BlogStepperProvider");
  }
  return context;
};

export function usePartnerHomeData() {
  return useQuery<PartnerMiscData, AxiosError<GenericError>>({
    queryKey: ["partner", "home"],
    queryFn: async () => {
      const raw = (
        await api("partnerAuth").get<GenericResponse<PartnerMiscData>>(
          "/partner/misc",
        )
      ).data;
      return raw.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function usePartnerProfileData() {
  return useQuery<PartnerProfileType, AxiosError<GenericError>>({
    queryKey: ["partner", "profile"],
    queryFn: async () => {
      const raw = (
        await api("partnerAuth").get<GenericResponse<PartnerProfileType>>(
          "/partner/misc/me",
        )
      ).data;
      return raw.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useHomeCoursesData() {
  return useQuery<HomeCoursesType, AxiosError<GenericError>>({
    queryKey: ["misc", "courses"],
    queryFn: async () => {
      const raw = (
        await api().get<GenericResponse<HomeCoursesType>>("/home/carousel")
      ).data;
      return raw.data;
    },
    staleTime: 1000 * 60 * 30,
  });
}
