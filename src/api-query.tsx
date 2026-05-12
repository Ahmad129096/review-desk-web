import React from "react";
import axios, { AxiosResponse } from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { User, Business, Review, Task, GoogleLocation } from "./types";

// Create axios instance
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  console.log({ token })
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API response types
interface ApiResponse<T> {
  data: T;
  token?: string;
  tasks?: Task[];
  businesses?: Business[];
  reviews?: Review[];
}

interface AuthResponse {
  user: User;
  token: string;
}

interface BusinessesResponse {
  businesses: Business[];
}

interface ReviewsResponse {
  reviews: Review[];
}

interface TasksResponse {
  tasks: Task[];
}

interface GoogleLocationsResponse {
  locations: GoogleLocation[];
}

interface GoogleSyncResponse {
  reviews: Review[];
  importedCount: number;
  publishedReplies: number;
}

export function getToken() {
  return localStorage.getItem("access_token");
}

export function setToken(token: string) {
  localStorage.setItem("access_token", token);
}

// API functions
export const api = {
  // Auth
  register: (input: { name: string; email: string; password: string }) =>
    apiClient.post<ApiResponse<AuthResponse>>("/api/auth/register", input),

  login: (input: { email: string; password: string }) =>
    apiClient.post<ApiResponse<AuthResponse>>("/api/auth/login", input).then((res) => res.data),

  me: () => apiClient.get<ApiResponse<User>>("/api/auth/me"),

  // Businesses
  businesses: () =>
    apiClient.get<ApiResponse<BusinessesResponse>>("/api/businesses"),

  createBusiness: (input: {
    name: string;
    industry: string;
    defaultTone: string;
    website: string;
    phone: string;
    address: string;
  }) =>
    apiClient.post<ApiResponse<{ business: Business }>>(
      "/api/businesses",
      input,
    ),

  // Reviews
  reviews: () => apiClient.get<ApiResponse<ReviewsResponse>>("/api/reviews"),

  createReview: (input: {
    businessId: string;
    reviewerName: string;
    rating: number;
    content: string;
  }) => apiClient.post<ApiResponse<{ review: Review }>>("/api/reviews", input),

  updateReview: (id: string, input: { status: string }) =>
    apiClient.patch<ApiResponse<{ review: Review }>>(
      `/api/reviews/${id}`,
      input,
    ),

  deleteReview: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/api/reviews/${id}`),

  importReviews: (input: { businessId: string; csv: string }) =>
    apiClient.post<ApiResponse<{ reviews: Review[] }>>(
      "/api/reviews/import",
      input,
    ),

  // Tasks
  tasks: () => apiClient.get<ApiResponse<TasksResponse>>("/api/tasks"),

  updateTask: (id: string, input: { status: string }) =>
    apiClient.patch<ApiResponse<{ task: Task }>>(`/api/tasks/${id}`, input),

  // Google Integration
  googleAuthUrl: (businessId: string) =>
    apiClient.get<ApiResponse<{ url: string }>>(
      `/api/google/auth-url/${businessId}`,
    ),

  googleLocations: (businessId: string) =>
    apiClient.get<ApiResponse<GoogleLocationsResponse>>(
      `/api/google/locations/${businessId}`,
    ),

  googleSelectLocation: (input: {
    businessId: string;
    accountName: string;
    locationName: string;
  }) => apiClient.post<ApiResponse<void>>("/api/google/select-location", input),

  googleSyncReviews: (input: {
    businessId: string;
    autoReply: boolean;
    autoReplyMinRating: number;
  }) =>
    apiClient.post<ApiResponse<GoogleSyncResponse>>(
      "/api/google/sync-reviews",
      input,
    ),

  // Review Actions
  regenerateReviewReply: (reviewId: string) =>
    apiClient.post<ApiResponse<{ review: Review }>>(
      `/api/reviews/${reviewId}/regenerate-reply`,
    ),

  googlePublishReply: (reviewId: string) =>
    apiClient.post<ApiResponse<{ review: Review }>>(
      `/api/reviews/${reviewId}/publish-to-google`,
    ),

  // Billing
  checkout: (plan: string) =>
    apiClient.post<ApiResponse<{ url: string }>>("/api/billing/checkout", {
      plan,
    }),

  updateReviewStatus: (reviewId: string, status: string) =>
    apiClient.patch<ApiResponse<{ review: Review }>>(
      `/api/reviews/${reviewId}`,
      { status },
    ),
};

// React Query hooks

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (input: { email: string; password: string }) => {
      const response = await api.login(input);
      return response;
    },
    onSuccess: (response) => {
      console.log({ response })
      localStorage.setItem("access_token", response.token!);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (input: { name: string; email: string; password: string }) => {
      const response = await api.register(input);
      return response;
    },
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.data.token!);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const logout = () => {
    localStorage.removeItem("access_token");
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  };

  return {
    loginMutation,
    registerMutation,
    logout,
  };
};

export const useBusinesses = () => {
  return useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const response = await api.businesses();
      console.log({ response }, "in useBusinesses");
      return response.data.businesses;
    },
  });
};

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createBusiness,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      return response.data.data.business;
    },
  });
};

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await api.reviews();
      return response.data.reviews;
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...input }: { id: string } & Partial<Review>) =>
      api.updateReview(id, { status: input.status as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useImportReviews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.importReviews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.tasks();
      return response.data.tasks;
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...input }: { id: string } & Partial<Task>) =>
      api.updateTask(id, { status: input.status as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useGoogleAuthUrl = () => {
  return useMutation({
    mutationFn: ({ businessId }: { businessId: string }) =>
      api.googleAuthUrl(businessId),
  });
};

export const useGoogleLocations = () => {
  return useMutation({
    mutationFn: ({ businessId }: { businessId: string }) =>
      api.googleLocations(businessId),
  });
};

export const useGoogleSelectLocation = () => {
  return useMutation({
    mutationFn: api.googleSelectLocation,
  });
};

export const useGoogleSyncReviews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.googleSyncReviews,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      return response.data;
    },
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: api.checkout,
  });
};

export const useRegenerateReviewReply = () => {
  return useMutation({
    mutationFn: api.regenerateReviewReply,
  });
};

export const useGooglePublishReply = () => {
  return useMutation({
    mutationFn: api.googlePublishReply,
  });
};

// Query client provider
export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
