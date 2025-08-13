import { Button, Input } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import Loading from "../../components/Loading";
import PartnerErrorHandler from "../../components/PartnerErrorHandler";
import Table from "../../components/Table";
import { api } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { useMemo, useState } from "react";

type PartnerStudents = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
};

function usePartnerStudents() {
  return useQuery<GenericResponse<PartnerStudents[]>, AxiosError<GenericError>>(
    {
      queryKey: ["partner", "students"],
      queryFn: async () => {
        return (await api("partnerAuth").get("/partner/students")).data;
      },
      staleTime: 1000 * 60 * 5,
    },
  );
}

export default function PartnerStudents() {
  const { data, isLoading, error } = usePartnerStudents();
  const [search, setSearch] = useState<string | undefined>();
  const filteredStudents = useMemo(() => {
    if (!data) return [];
    return data.data.filter(
      (d) =>
        d.firstName
          .toLowerCase()
          .trim()
          .includes(search || "") ||
        d.lastName
          ?.toLowerCase()
          .trim()
          .includes(search || "") ||
        d.email
          .toLowerCase()
          .trim()
          .includes(search || ""),
    );
  }, [data, search]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) return <PartnerErrorHandler error={error} />;

  const students = data?.data;

  return (
    <div className="flex flex-col items-center gap-4 lg:mt-20 p-4">
      <div className="control-bar w-full mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Input
          leftSection={<Search size={16} />}
          classNames={{ wrapper: "ml-auto w-64" }}
          placeholder="Search for students..."
          value={search}
          radius={999}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
        />
      </div>
      <div className="w-full overflow-auto">
        {!students ? (
          <p className="text-center text-gray-600">No students found</p>
        ) : (
          <Table
            headers={[
              { id: 1, render: "S.No", className: "w-[10%]" },
              { id: 2, render: "Name" },
              { id: 3, render: "Email" },
              { id: 5, render: "Details", className: "w-[20%]" },
            ]}
            classNames={{
              root: "bg-white rounded-lg",
            }}
            rows={filteredStudents.map((r, i) => ({
              id: r.id,
              cells: [
                {
                  render: i + 1,
                  className: "w-[10%]",
                },
                {
                  render: r.firstName + " " + (r.lastName || ""),
                },
                {
                  render: r.email,
                },
                {
                  render: <Button radius={999}>View Details</Button>,
                },
              ],
            }))}
          />
        )}
      </div>
    </div>
  );
}
