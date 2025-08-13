import { useQuery } from "@tanstack/react-query";
import Table from "../../components/Table";
import { PartnerTrainingResponse } from "../partner/PartnerTrainings";
import { api } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { formatDate, mutationErrorHandler } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Errorbox from "../../components/Errorbox";
import { Badge, Button, Input } from "@mantine/core";
import { Calendar1, CalendarCheckIcon, Search } from "lucide-react";

type AdminTrainingsType = PartnerTrainingResponse;

function useAdminTrainings() {
  return useQuery<
    GenericResponse<AdminTrainingsType[]>,
    AxiosError<GenericError>
  >({
    queryKey: ["admin", "trainings"],
    queryFn: async () => (await api("adminAuth").get("/admin/trainings")).data,
    staleTime: 1000 * 60 * 5,
  });
}

export default function AdminTrainings() {
  const { data, isLoading, error } = useAdminTrainings();
  const [search, setSearch] = useState<string | undefined>();
  const navigate = useNavigate();

  const filteredTrainings = useMemo(() => {
    if (!data) return [];
    return data.data.filter(
      (training) =>
        training.title.toLowerCase().includes(search?.toLowerCase() || "") ||
        training.instructor.firstName
          .toLowerCase()
          .includes(search?.toLowerCase() || "") ||
        (training.instructor.lastName &&
          training.instructor.lastName
            .toLowerCase()
            .includes(search?.toLowerCase() || "")) ||
        training.enrolments?.length.toString().includes(search || ""),
    );
  }, [data, search]); // Filter trainings based on search input

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

  return (
    <div className="flex flex-col items-center gap-4 mt-20 p-4">
      <div className="control-bar w-full mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Trainings</h1>
        <Input
          leftSection={<Search size={16} />}
          radius={999}
          classNames={{ wrapper: "ml-auto w-64" }}
          placeholder="Search for trainings..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full">
        {!data ? (
          <Errorbox message="Cannot get data due to some unknown error" />
        ) : (
          <Table
            headers={[
              { render: "S.No", className: "w-[10%]" },
              { render: "Course Name", className: "w-[25%]" },
              { render: "Created by" },
              { render: "Enrolment Count" },
              { render: "Dates" },
              { render: "Status" },
              { render: "Details", className: "w-[20%]" },
            ]}
            classNames={{
              root: "bg-white rounded-lg shadow",
            }}
            rows={filteredTrainings.map((r, i) => ({
              id: r.id,
              cells: [
                {
                  render: i + 1,
                  className: "w-[10%]",
                },
                {
                  render: r.title,
                  className: "w-[25%]",
                },
                {
                  render:
                    r.instructor.firstName +
                    " " +
                    (r.instructor.lastName ?? ""),
                },
                {
                  render: r.enrolments?.length ?? 0,
                },
                {
                  render: (
                    <div className="grid text-sm *:flex *:gap-2">
                      <span>
                        <Calendar1 size={16} />
                        {formatDate(r.startDate)}
                      </span>
                      {/* <hr className="border-none h-6 w-[1px] mx-auto bg-gray-200" /> */}
                      to
                      <span>
                        <CalendarCheckIcon size={16} />
                        {formatDate(r.endDate)}
                      </span>
                    </div>
                  ),
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
            }))} // Use filteredTrainings for the rows
          />
        )}
      </div>
    </div>
  );
}
