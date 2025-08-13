import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { PartnerPayoutEligibilityStatus } from "../lib/types";
import { cn } from "../lib/utils";

type Props = {
  status: PartnerPayoutEligibilityStatus;
};

const mapBgClassNameToStatus = (status: PartnerPayoutEligibilityStatus) => ({
  "bg-red-50": status === "failed",
  "bg-amber-50/50": status === "pending-details",
  "bg-blue-50": status === "pending-approval",
  "bg-green-100": status === "approved",
  "bg-yellow-100/50": status === "no-data",
});

function LinkToPayoutPage() {
  return (
    <Link to={"/partner/settings/account"} className="mt-2">
      <Button radius={999}>
        Click here
        {/* <FaExternalLinkAlt /> */}
      </Button>
    </Link>
  );
}

const mapTitleToStatus: {
  [key in PartnerPayoutEligibilityStatus]: React.ReactNode;
} = {
  approved: <h3 className="text-green-400 font-medium">Payout Approved</h3>,
  "pending-approval": (
    <h3 className="text-blue-400 font-medium">Payout approval pending</h3>
  ),
  "pending-details": (
    <h3 className="text-amber-400 font-medium">Fill up payout details</h3>
  ),
  failed: <h3 className="text-red-400 font-medium">Approval failed</h3>,
  "no-data": (
    <h3 className="text-amber-400 font-medium">Fill up payout details</h3>
  ),
};

const mapContentToStatus: {
  [key in PartnerPayoutEligibilityStatus]: React.ReactNode;
} = {
  approved: (
    <>
      <p className="text-green-500 text-sm">
        You are not eligible for payouts.
      </p>
      <p className="text-green-500 text-sm">
        Once a training ends, your bank account details will be used to settle
        your payments
      </p>
    </>
  ),
  "pending-approval": (
    <>
      <p className="text-blue-500 text-sm">
        We are still approving your bank details
      </p>
      <p className="text-blue-500 text-sm">
        Once you are approved, you will be eligible for payouts
      </p>
    </>
  ),
  "pending-details": (
    <>
      <p className="text-amber-500 text-sm">
        You are not eligible for payouts.
      </p>
      <p className="text-amber-500 text-sm">
        Once a training ends, your bank account details will be used to settle
        your payments
      </p>
    </>
  ),
  failed: (
    <>
      <p className="text-red-500 text-sm">Bank details approval failed!</p>
      <p className="text-red-500 text-sm">
        Please click the link below to review and edit your banking details or
        contact us for help
      </p>
      <LinkToPayoutPage />
    </>
  ),
  "no-data": (
    <>
      <p className="text-yellow-500 text-sm">
        You need to fill up payout details for us to pay your margin of course
        profit back
      </p>
      <LinkToPayoutPage />
    </>
  ),
};

export default function PayoutStatusBanner({ status }: Props) {
  return (
    <div
      className={cn(
        "flex rounded-lg gap-1 bg-amber-50 p-3 flex-col",
        mapBgClassNameToStatus(status),
      )}
    >
      {mapTitleToStatus[status]}
      {mapContentToStatus[status]}
    </div>
  );
}
