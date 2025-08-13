import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import Errorbox from "../../components/Errorbox";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import { api } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { formatDate, mutationErrorHandler } from "../../lib/utils";
import { AdminTrainingDetails } from "./AdminTrainingSpotlight";

export type AdminStudentDetailsType = {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  mobile: string;
  enrolments: {
    id: string;
    completedOn: Date | null;
    userId: string;
    trainingId: string;
    createdAt: string;
    training: Omit<AdminTrainingDetails, "enrolments" | "instructor">;
  }[];
};

function useAdminStudentDetailsType(id: string) {
  return useQuery<
    GenericResponse<AdminStudentDetailsType>,
    AxiosError<GenericError>
  >({
    queryKey: ["admin", "students", id],
    queryFn: async () =>
      (await api("adminAuth").get(`/admin/students/${id}`)).data,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

function AdminStudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useAdminStudentDetailsType(id || "");

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

  const student = data?.data;

  return (
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
        <h1 className="text-3xl font-semibold mb-6 text-left">
          Student Details
        </h1>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col">
            <span className="text-sm">Name </span>
            <span className="text-lg font-semibold">
              {student?.firstName + " " + (student?.lastName ?? "")}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Phone </span>
            <span className="text-lg font-semibold">{student?.mobile}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Email </span>
            <span className="text-lg font-semibold">{student?.email}</span>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">Courses enrolled</h3>
        <Table
          headers={[
            { render: "S.No", className: "w-[10%]" },
            { render: "Course Name" },
            { render: "Enrolled on" },
            { render: "Dates" },
            { render: "Details" },
          ]}
          classNames={{
            root: "bg-white rounded-lg shadow",
          }}
          rows={student!.enrolments.map((r, i) => ({
            id: r.id,
            cells: [
              {
                render: i + 1,
                className: "w-[10%]",
              },
              {
                render: r.training.title,
              },
              {
                render: formatDate(r.createdAt),
              },
              {
                render:
                  formatDate(r.training.startDate) +
                  " to " +
                  formatDate(r.training.endDate),
              },
              {
                render: (
                  <Link to={`/admin/trainings/${r.training.id}`}>
                    <Button radius={999}>View details</Button>
                  </Link>
                ),
              },
            ],
          }))}
        />
      </div>
    </div>
  );
}

export default AdminStudentDetails;
