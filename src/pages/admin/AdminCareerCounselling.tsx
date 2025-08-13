import { Badge, Input } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errorbox from "../../components/Errorbox";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import { api } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { formatDate, mutationErrorHandler } from "../../lib/utils";

type AdminCareerCounselling = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  mobile: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  plan: "Basics" | "Premium" | null;
  service: string | null;
  transactions: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    transactionId: string;
    careerId: string;
    transaction: {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      txnNo: string | null;
      paymentId: string | null;
      orderId: string;
      signature: string | null;
      idempotencyId: string | null;
      amount: string;
      status: "pending" | "success" | "cancelled" | "failed" | null;
    };
  }[];
};

function useAdminCareerCounselling() {
  return useQuery<
    GenericResponse<AdminCareerCounselling[]>,
    AxiosError<GenericError>
  >({
    queryKey: ["admin", "enquiry", "career"],
    queryFn: async () =>
      (await api("adminAuth").get("/admin/applications/career")).data,
    staleTime: 1000 * 60 * 5,
  });
}

export default function AdminCareerCounselling() {
  const { data, isLoading, error } = useAdminCareerCounselling();
  const [search, setSearch] = useState<string | undefined>();
  const navigate = useNavigate();

  const filteredPsychology = useMemo(() => {
    if (!data) return [];
    return data.data.filter(
      (registration) =>
        registration.firstName
          .toLowerCase()
          .includes(search?.toLowerCase() || "") ||
        registration.lastName
          ?.toLowerCase()
          .includes(search?.toLowerCase() || "") ||
        registration.email
          .toLowerCase()
          .includes(search?.toLowerCase() || "") ||
        registration.mobile.toLowerCase().includes(search?.toLowerCase() || ""),
    );
  }, [data, search]); // Filter psychology based on search input

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
    <div className="flex flex-col items-center gap-4 w-full p-4">
      <div className="control-bar w-full mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Career counselling registrations
        </h1>
        <Input
          leftSection={<Search size={16} />}
          radius={999}
          classNames={{ wrapper: "ml-auto w-64" }}
          placeholder="Search for name, city, mobile, etc..."
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
              { render: "Name" },
              { render: "Email" },
              { render: "Mobile" },
              { render: "Service/Plan" },
              { render: "Payment" },
              { render: "Registered on" },
            ]}
            classNames={{
              root: "bg-white rounded-lg shadow",
            }}
            rows={filteredPsychology.map((r, i) => ({
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
                  render: r.service ? (
                    <>
                      {r.service} <Badge className="ml-2">service</Badge>
                    </>
                  ) : (
                    <>
                      {r.plan}
                      <Badge className="ml-2" size="sm">
                        plan
                      </Badge>
                    </>
                  ),
                },
                {
                  render: (
                    <>
                      ₹{r.transactions?.[0]?.transaction.amount}
                      <Badge className="ml-2" size="sm">
                        {r.transactions?.[0]?.transaction.status}
                      </Badge>
                    </>
                  ),
                },
                {
                  render: formatDate(r.createdAt),
                },
              ],
            }))}
          />
        )}
      </div>
    </div>
  );
}
