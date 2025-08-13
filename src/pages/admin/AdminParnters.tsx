import { Badge, Button, Input } from "@mantine/core";
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

export type AdminPartners = {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  mobile: string;
  trainingTopic?: string | null;
  trainingDays?: string | null;
  institutionName: string | null;
  addressId: number;
  approvedBy: string | null;
};

export type AdminPartnersType = AdminPartners & {
  trainings:
    | {
        id: string;
      }[]
    | null;
};

function useAdminPartners() {
  return useQuery<
    GenericResponse<AdminPartnersType[]>,
    AxiosError<GenericError>
  >({
    queryKey: ["admin", "partners"],
    queryFn: async () => (await api("adminAuth").get("/admin/partners")).data,
    staleTime: 1000 * 60 * 5,
  });
}

export default function AdminPartners() {
  const { data, isLoading, error } = useAdminPartners();
  const [search, setSearch] = useState<string | undefined>();
  const navigate = useNavigate();

  const filteredPartners = useMemo(() => {
    if (!data) return [];
    return data.data.filter(
      (partner) =>
        partner.firstName.toLowerCase().includes(search?.toLowerCase() || "") ||
        (partner.lastName &&
          partner.lastName
            .toLowerCase()
            .includes(search?.toLowerCase() || "")) ||
        partner.email.toLowerCase().includes(search?.toLowerCase() || "") ||
        partner.mobile.includes(search || "") ||
        (partner.institutionName &&
          partner.institutionName
            .toLowerCase()
            .includes(search?.toLowerCase() || "")),
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
        <h1 className="text-2xl font-semibold">Partners</h1>
        <Input
          leftSection={<Search size={16} />}
          classNames={{ wrapper: "ml-auto w-64" }}
          placeholder="Search for partners..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          radius={999}
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
              { render: "Institution Name" },
              { render: "Status" },
              { render: "Details", className: "w-[20%]" },
            ]}
            classNames={{
              root: "bg-white rounded-lg shadow",
            }}
            rows={filteredPartners.map((r, i) => ({
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
                  render: r.institutionName || (
                    <Badge color="blue">individual</Badge>
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
                    <Link to={`/admin/partners/${r.id}`}>
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
