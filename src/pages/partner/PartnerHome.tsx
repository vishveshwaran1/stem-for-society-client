import { Skeleton } from "@mantine/core";
import { FaGraduationCap, FaUserFriends } from "react-icons/fa";
import InfoCard from "../../components/InfoCard";
import PartnerErrorHandler from "../../components/PartnerErrorHandler";
import PayoutStatusBanner from "../../components/PayoutStatusBanner";
import { usePartner, usePartnerHomeData } from "../../lib/hooks";

export default function PartnerHome() {
  const { user } = usePartner();
  const { data, isLoading, error } = usePartnerHomeData();

  if (error) return <PartnerErrorHandler error={error} />;

  return (
    <div className="p-4 space-y-3 h-full">
      <h4 className="text-3xl">Welcome, {user?.user.firstName}</h4>
      {!user?.user.isApproved ? (
        <div className="w-full m-2 p-3 h-full bg-yellow-50/70 flex flex-col justify-center items-center">
          <img src="/Waiting-rafiki.png" className="w-auto h-96" />
          <p className="text-amber-500 text-xl font-semibold">
            Your account awaits approval!
          </p>
          <p className="text-amber-800">
            We are reviewing your account and will be activated soon
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 w-full">
            {isLoading ? (
              <>
                <Skeleton height={100} width={256} radius="md" />
                <Skeleton height={100} width={256} radius="md" />
              </>
            ) : (
              <>
                <InfoCard
                  title="Students"
                  value={`${data?.studentsCount} students`}
                  titleClassName="text-green-700"
                  icon={<FaUserFriends className="text-green-500" />}
                  rootClassName="bg-green-100"
                  valueClassName="text-green-500"
                />
                <InfoCard
                  title="Courses"
                  value={`${data?.trainingsCount} courses`}
                  titleClassName="text-blue-700"
                  icon={<FaGraduationCap className="text-blue-500" />}
                  rootClassName="bg-blue-100"
                  valueClassName="text-blue-500"
                />
              </>
            )}
            {/* <InfoCard
              title="Courses"
              value="X"
              titleClassName="text-blue-700"
              icon={<FaUserFriends className="text-blue-500" />}
              rootClassName="bg-blue-100"
              valueClassName="text-blue-500"
            /> */}
          </div>
          {isLoading || !data ? (
            <Skeleton width={"100%"} h={100} />
          ) : (
            <PayoutStatusBanner status={data.payoutEligibility} />
          )}
        </>
      )}
    </div>
  );
}
