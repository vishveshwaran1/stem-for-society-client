import { Badge, Button } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Errorbox from "../../components/Errorbox";
import Loading from "../../components/Loading";
import { api, queryClient } from "../../lib/api";
import {
  GenericError,
  GenericResponse,
  PartnerPayoutEligibilityStatus,
} from "../../lib/types";
import { formatDate, mutationErrorHandler } from "../../lib/utils";
import { ChevronLeft } from "lucide-react";
import { PartnerTraining } from "../partner/PartnerTrainings";
import { AddressType } from "./AdminTrainingSpotlight";
import { toast } from "react-toastify";
import Table from "../../components/Table";

export type AdminPartnersDetailsType = {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  mobile: string;
  topics?: string[] | null;
  trainingDays?: string | null;
  institutionName: string | null;
  addressId?: number;
  approvedBy: string | null;
  createdAt: string;
  trainings: (PartnerTraining & {
    enrolments?: { id: string; paidOn?: string; createdAt: string }[];
  })[];
  address: AddressType;
  account?: AccountType;
  payoutEligibility: PartnerPayoutEligibilityStatus;
};

export type AccountType = {
  id: string;
  partnerId: string;
  rzpyContactId: string | null;
  rzpyFundingAcctId: string | null;
  rzpyBankAcctId: string | null;
  rzpyVPAId: string | null;
  rzpyCardId: string | null;
  bankAccVerifiedOn: string;
  VPAVerifiedOn: Date | string | null;
  cardVerifiedOn: Date | string | null;
};

function useAdminPartnersDetailsType(id: string) {
  return useQuery<
    GenericResponse<AdminPartnersDetailsType>,
    AxiosError<GenericError>
  >({
    queryKey: ["admin", "partners", id],
    queryFn: async () =>
      (await api("adminAuth").get(`/admin/partners/${id}`)).data,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Ensure query only runs if `id` is defined
  });
}

function useAdminPartnerApproval(id?: string) {
  const navigate = useNavigate();
  return useMutation<
    GenericResponse,
    AxiosError<GenericError>,
    "approve" | "deny"
  >({
    mutationFn: async (data) =>
      (
        await api("adminAuth").post(`/admin/partners/${id}/decision`, {
          decision: data,
        })
      ).data,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin", "partners", id] });
      queryClient.invalidateQueries({ queryKey: ["admin", "partners"] });
    },
    onError: (err) => mutationErrorHandler(err, navigate, "/admin/signin"),
  });
}

function AdminPartnerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useAdminPartnersDetailsType(id || "");
  const { mutate, isPending } = useAdminPartnerApproval(id);

  useEffect(() => {
    if (error) mutationErrorHandler(error, navigate, "/admin/signin");
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Errorbox message={error.message} />;
  }

  const partner = data?.data;

  return (
    <>
      <div className="flex flex-col items-center gap-4 mt-8 p-4">
        <div className="w-full">
          {/*// @ts-expect-error shutup */}
          <Link to={-1}>
            <Button radius={999} fullWidth={false}>
              <ChevronLeft size={16} />
              Back
            </Button>
          </Link>
        </div>
        <div className="w-full flex-col max-w-7xl">
          <h1 className="text-2xl font-semibold mb-6 text-left">
            Partner Details
          </h1>
          <div className="flex gap-20">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col">
                <span className="text-sm">Name </span>
                <span className="text-lg font-semibold">
                  {partner?.firstName + " " + (partner?.lastName ?? "")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Phone </span>
                <span className="text-lg font-semibold">{partner?.mobile}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Email </span>
                <span className="text-lg font-semibold">{partner?.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Joined on </span>
                <span className="text-lg font-semibold">
                  {formatDate(partner?.createdAt ?? null)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-sm">Company Name </span>
                <span className="text-lg font-semibold">
                  {partner?.institutionName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Address</span>
                <span className="text-lg font-semibold">
                  <p>{partner?.address.addressLine1}</p>
                  <p>{partner?.address.addressLine2 ?? ""}</p>
                  <p>{partner?.address.city}</p>
                  <p>{partner?.address.state}</p>
                  <p>{partner?.address.pincode}</p>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Teaching topics</span>
                <span className="text-lg font-semibold">
                  <ul>
                    {partner?.topics?.map((topic) => (
                      <li>
                        <Badge size="sm" color="gray">
                          {topic}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-medium">Account Details </span>
                <p className="text-sm mb-5">
                  {partner?.payoutEligibility === "approved"
                    ? "This person is eligible for payouts"
                    : partner?.payoutEligibility === "no-data"
                      ? "This person is yet to fill their bank account details"
                      : partner?.payoutEligibility === "failed"
                        ? "Payout details invalid. Verification failed from Razorpay"
                        : partner?.payoutEligibility === "pending-approval"
                          ? "Pending approval"
                          : partner?.payoutEligibility === "pending-details"
                            ? "Pending details"
                            : ""}
                </p>
                <span className="text-sm">Razorpay Account ID</span>
                <span className="text-lg font-semibold">
                  {partner?.account?.rzpyContactId ?? <i>N/A</i>}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Bank Account ID</span>
                <span className="text-lg font-semibold">
                  {partner?.account?.rzpyBankAcctId}{" "}
                  <Badge
                    color={
                      partner?.account?.bankAccVerifiedOn ? "blue" : "yellow"
                    }
                  >
                    {partner?.account?.bankAccVerifiedOn
                      ? "verified"
                      : "unverified"}
                  </Badge>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">VPA ID</span>
                <span className="text-lg font-semibold">
                  {partner?.account?.rzpyVPAId}{" "}
                  <Badge
                    color={partner?.account?.VPAVerifiedOn ? "blue" : "yellow"}
                  >
                    {partner?.account?.VPAVerifiedOn
                      ? "verified"
                      : "unverified"}
                  </Badge>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Card ID</span>
                <span className="text-lg font-semibold">
                  {partner?.account?.rzpyCardId}{" "}
                  <Badge
                    color={partner?.account?.cardVerifiedOn ? "blue" : "yellow"}
                  >
                    {partner?.account?.cardVerifiedOn
                      ? "verified"
                      : "unverified"}
                  </Badge>
                </span>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-medium mt-6">Courses created</h3>
          <Table
            headers={[
              { render: "S.No", className: "w-[10%]" },
              { render: "Course Name" },
              { render: "Enrolment Count" },
              { render: "Dates" },
              { render: "Status" },
              { render: "Details", className: "w-[20%]" },
            ]}
            classNames={{
              root: "bg-white rounded-lg shadow",
            }}
            rows={partner!.trainings.map((r, i) => ({
              id: r.id,
              cells: [
                {
                  render: i + 1,
                  className: "w-[10%]",
                },
                {
                  render: r.title,
                },
                {
                  render: r.enrolments?.length,
                },
                {
                  render:
                    formatDate(r.startDate) + " to " + formatDate(r.endDate),
                },
                {
                  render: (
                    <Badge
                      color={r.approvedBy ? "green" : "gray"}
                      classNames={{ label: "font-normal" }}
                    >
                      {r.approvedBy ? "approved" : "pending"}
                    </Badge>
                  ),
                },
                {
                  render: (
                    <Link to={`/admin/trainings/${r.id}`}>
                      <Button radius={999}>View details</Button>
                    </Link>
                  ),
                },
              ],
            }))}
          />
          <div className="flex justify-start items-start mt-5">
            {!partner?.approvedBy ? (
              <Button
                radius={999}
                variant="filled"
                color="green"
                className="text-xs sm:text-sm md:text-base"
                onClick={() => mutate("approve")}
                disabled={isPending}
              >
                Approve
              </Button>
            ) : (
              <Button
                radius={999}
                variant="filled"
                color="red"
                className="text-xs sm:text-sm md:text-base"
                onClick={() => mutate("deny")}
                disabled={isPending}
              >
                Reject
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPartnerDetails;
