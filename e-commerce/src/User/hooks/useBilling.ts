import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  billingApi,
  BillingDetails,
  CreateBillingDetailsDto,
} from "../services/api";

export const useBilling = (userId: number) => {
  const queryClient = useQueryClient();

  // Query for getting billing details
  const {
    data: billingDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["billing", userId],
    queryFn: () => billingApi.getBillingDetails(userId),
    enabled: !!userId,
  });

  // Mutation for creating/updating billing details
  const saveBillingMutation = useMutation({
    mutationFn: (details: CreateBillingDetailsDto) =>
      billingDetails
        ? billingApi.updateBillingDetails(userId, details)
        : billingApi.createBillingDetails(userId, details),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing", userId] });
    },
  });

  return {
    billingDetails,
    isLoading,
    error,
    saveBillingDetails: saveBillingMutation.mutate,
    isSaving: saveBillingMutation.isPending,
  };
};
