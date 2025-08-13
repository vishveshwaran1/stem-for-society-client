import { Alert, Button, SegmentedControl, TextInput } from "@mantine/core";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import PartnerErrorHandler from "../../components/PartnerErrorHandler";
import { usePartner, usePartnerProfileData } from "../../lib/hooks";
import { Info } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GenericError, GenericResponse } from "../../lib/types";
import { AxiosError } from "axios";
import { api } from "../../lib/api";
import { mutationErrorHandler } from "../../lib/utils";
import { toast } from "react-toastify";

type BankAccountType = {
  ifsc: string;
  bank_name: string;
  name: string;
  account_number: string;
};

type VPAAccountType = { address: string };

export type AccountDataType =
  | {
      type: "bank_account";
      bank_account?: BankAccountType;
    }
  | {
      type: "vpa";
      vpa?: VPAAccountType;
    }
  | null;

function usePartnerAccountSubmit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<
    GenericResponse,
    AxiosError<GenericError>,
    { bank_account: BankAccountType } | { vpa: VPAAccountType }
  >({
    mutationFn: async (data) => {
      return (await api("partnerAuth").post("/partner/misc/account", data))
        .data;
    },
    onError: (err) => mutationErrorHandler(err, navigate, "/partner/"),
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["partner", "profile"] });
    },
  });
}

export default function PartnerAccounts() {
  const { user, isLoading, error } = usePartner();
  const {
    isLoading: partnerProfileLoading,
    error: partnerProfileError,
    data: partnerProfile,
  } = usePartnerProfileData();
  const { mutate, isPending } = usePartnerAccountSubmit();

  const [formData, setFormData] = useState<AccountDataType>({
    type: "bank_account",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // @ts-expect-error mairu
    setFormData((prevData) => {
      if (prevData?.type === "bank_account") {
        return {
          type: "bank_account",
          bank_account: {
            ...(prevData.bank_account || {}),
            [name]: value,
          },
        };
      }
      if (prevData?.type === "vpa") {
        return {
          type: "vpa",
          vpa: {
            ...(prevData.vpa || {}),
            [name]: value,
          },
        };
      }
      return null;
    });
  };

  if (isLoading || partnerProfileLoading) {
    return <Loading />;
  }

  if (error || partnerProfileError)
    return <PartnerErrorHandler error={error || partnerProfileError!} />;

  if (!user) return <Navigate to={"/partner"} />;

  return (
    <div className="p-4 space-y-3 w-full h-full">
      <div className="space-y-1">
        <h4 className="font-medium">
          View and edit payment account settings here
        </h4>
        <p className="text-sm">
          To be eligible for payouts, you need to fill up these details, after
          which we will verify the details
        </p>
        <Alert icon={<Info />} color="blue">
          You are only eligible for payouts after verification process is
          successful
        </Alert>
      </div>

      <div className="flex flex-col gap-2 w-[400px] mx-auto">
        {partnerProfile?.account?.bankAccVerifiedOn ||
        partnerProfile?.account?.VPAVerifiedOn ||
        partnerProfile?.account?.cardVerifiedOn ? (
          <Alert color="green">
            Your account has been verified. You are eligible for payouts
          </Alert>
        ) : (partnerProfile?.account?.rzpyBankAcctId &&
            !partnerProfile.account.bankAccVerifiedOn) ||
          (partnerProfile?.account?.rzpyCardId &&
            !partnerProfile.account.cardVerifiedOn) ||
          (partnerProfile?.account?.rzpyVPAId &&
            !partnerProfile.account.VPAVerifiedOn) ? (
          <Alert color="yellow">
            Your account is being verified. You will be eligible for payouts
          </Alert>
        ) : (
          <>
            <SegmentedControl
              data={[
                { label: "Bank Account", value: "bank_account" },
                { label: "UPI", value: "vpa", disabled: true },
              ]}
              value={formData?.type}
              onChange={(value) =>
                // @ts-expect-error moodu
                setFormData((prev) => ({ ...prev, type: value }))
              }
            />
            {formData?.type === "bank_account" ? (
              <>
                <TextInput
                  label="Account name"
                  placeholder="Enter your name"
                  size="sm"
                  required
                  name="name"
                  value={formData?.bank_account?.name}
                  onChange={handleInputChange}
                />
                <TextInput
                  label="Bank Name"
                  placeholder="Enter Bank Name"
                  size="sm"
                  required
                  name="bank_name"
                  value={formData?.bank_account?.bank_name}
                  onChange={handleInputChange}
                />
                <TextInput
                  label="IFSC"
                  placeholder="Enter IFSC code"
                  size="sm"
                  required
                  name="ifsc"
                  value={formData?.bank_account?.ifsc}
                  onChange={handleInputChange}
                />
                <TextInput
                  label="Account Number"
                  placeholder="Enter Account number"
                  size="sm"
                  required
                  name="account_number"
                  value={formData?.bank_account?.account_number}
                  onChange={handleInputChange}
                />
              </>
            ) : formData?.type === "vpa" ? (
              <TextInput
                label="UPI Address"
                placeholder="Enter your UPI ID"
                size="sm"
                required
                name="address"
                value={formData?.vpa?.address}
                onChange={handleInputChange}
              />
            ) : null}
          </>
        )}
        <Button
          radius={999}
          w="400"
          type="submit"
          onClick={() => {
            console.log("🚀 ~ PartnerAccounts ~ formData:", formData);
            if (!formData) {
              return toast.error("Invalid data");
            }
            mutate(
              formData.type === "bank_account"
                ? { bank_account: formData.bank_account! }
                : { vpa: formData.vpa! },
            );
          }}
          disabled={isPending}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
