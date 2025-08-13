import { Badge, Button, Input } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errorbox from "../../components/Errorbox";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import { api } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { formatDate, mutationErrorHandler } from "../../lib/utils";

export type PartnerTraining = {
  id: string;
  title: string;
  description: string | null;
  coverImg: string | null;
  link: string | null;
  startDate: Date | null;
  endDate: Date | null;
  durationValue: string;
  durationType: "Weeks" | "Days" | "Months" | "Hours";
  type: "ONLINE" | "OFFLINE" | "HYBRID";
  location: string | null;
  cost: string | null;
  cut: number | null;
  ratings?: {
    userId: string;
    trainingId: string;
    rating: number;
    feedback: string;
  }[];
  createdBy: string | null;
  approvedBy: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  category: string | null;
  lessons: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    title: string;
    location: string | null;
    type: "ONLINE" | "OFFLINE";
    trainingId: string | null;
    content: string | null;
    video: string | null;
    lastDate: Date | null;
  }[];
};

export type PartnerTrainingResponse = PartnerTraining & {
  instructor: {
    firstName: string;
    lastName?: string;
  };
  enrolments: {
    id: number;
  }[];
};

function usePartnerTrainings() {
  return useQuery<
    GenericResponse<PartnerTrainingResponse[]>,
    AxiosError<GenericError>
  >({
    queryKey: ["partner", "trainings"],
    queryFn: async () => {
      return (await api("partnerAuth").get("/partner/trainings")).data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export default function PartnerTrainings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string | undefined>();
  const { data, isPending, error } = usePartnerTrainings();

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
  }, [data, search]);

  useEffect(() => {
    if (error) mutationErrorHandler(error, navigate, "/partner/signin");
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 lg:mt-20 p-4">
      <div className="control-bar w-full mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Trainings</h1>
        <Input
          leftSection={<Search size={16} />}
          classNames={{ wrapper: "ml-auto w-64" }}
          onChange={(e) => setSearch(e.target.value)}
          radius={999}
          placeholder="Search for trainings..."
          type="search"
        />
      </div>
      <div className="flex w-full">
        <Link to={"/partner/create"}>
          <Button
            radius={999}
            classNames={{
              label: "flex gap-1 tracking-wide",
            }}
          >
            <Plus />
            Create new course
          </Button>
        </Link>
      </div>
      <div className="w-full relative overflow-auto">
        {error ? (
          <Errorbox message={error.message} />
        ) : !error && isPending ? (
          <Loading />
        ) : (
          data && (
            <Table
              headers={[
                { render: "S.No", className: "w-[10%]" },
                { render: "Course Name", className: "w-[15%]" },
                { render: "Enrolment Count", className: "w-[10%]" },
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
                    className: "w-[15%]",
                  },
                  {
                    render: r.enrolments?.length ?? 0,
                    className: "w-[10%]",
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
                      <Link to={`/partner/trainings/${r.id}`}>
                        <Button radius={999}>View Details</Button>
                      </Link>
                    ),
                  },
                ],
              }))}
            />
          )
        )}
      </div>
    </div>
  );
}
