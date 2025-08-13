import { Button, Input } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errorbox from "../../components/Errorbox";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import { api } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { mutationErrorHandler } from "../../lib/utils";
import { Search } from "lucide-react";

export type AdminStudents = {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  mobile: string;
};

export type AdminStudentsType = AdminStudents & {
  trainings:
    | {
        id: string;
      }[]
    | null;
};

function useAdminStudents() {
  return useQuery<
    GenericResponse<AdminStudentsType[]>,
    AxiosError<GenericError>
  >({
    queryKey: ["admin", "students"],
    queryFn: async () => (await api("adminAuth").get("/admin/students")).data,
    staleTime: 1000 * 60 * 5,
  });
}

export default function AdminStudents() {
  const { data, isLoading, error } = useAdminStudents();
  const [search, setSearch] = useState<string | undefined>();
  const navigate = useNavigate();

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
          .includes(search || "") ||
        d.mobile
          .toLowerCase()
          .trim()
          .includes(search || ""),
    );
  }, [data, search]);

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
        <h1 className="text-2xl font-semibold">Students</h1>
        <Input
          leftSection={<Search size={16} />}
          classNames={{ wrapper: "ml-auto w-64" }}
          placeholder="Search for students..."
          type="search"
          value={search}
          radius={999}
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
              { render: "Name" },
              { render: "Email" },
              { render: "Mobile" },
              { render: "Details", className: "w-[20%]" },
            ]}
            classNames={{
              root: "bg-white rounded-lg shadow",
            }}
            rows={filteredStudents.map((r, i) => ({
              id: r.id,
              cells: [
                {
                  render: i + 1,
                  className: "w-[10%]",
                },
                {
                  render: r.firstName + " " + (r.lastName ?? ""),
                },
                {
                  render: r.email,
                },
                {
                  render: r.mobile,
                },
                {
                  render: (
                    <Link to={`/admin/students/${r.id}`}>
                      <Button radius={999}>View details</Button>
                    </Link>
                  ),
                },
              ],
            }))}
          />
        )}
      </div>
    </div>
  );
}
