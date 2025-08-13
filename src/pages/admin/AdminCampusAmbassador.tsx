import { Alert, Button, Input, Modal } from "@mantine/core";
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
import LabelAndValue from "../../components/LabelAndValue";

type AdminCAApplications = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  mobile: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  linkedin: string | null;
  eduType: "UG" | "PG" | "PhD";
  department: string;
  collegeName: string;
  yearInCollege: number | null;
  collegeCity: string;
  dob: string | null;
};

function useAdminCampusAmbassador() {
  return useQuery<
    GenericResponse<AdminCAApplications[]>,
    AxiosError<GenericError>
  >({
    queryKey: ["admin", "enquiry", "ca"],
    queryFn: async () =>
      (await api("adminAuth").get("/admin/applications/ca")).data,
    staleTime: 1000 * 60 * 5,
  });
}

export default function AdminCampusAmbassador() {
  const { data, isLoading, error } = useAdminCampusAmbassador();
  const [search, setSearch] = useState<string | undefined>();
  const [activeAmbId, setActiveAmbId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredCampusAmbassador = useMemo(() => {
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
  }, [data, search]); // Filter campusAmbassador based on search input

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
          Campus Ambassador applications
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
              { render: "Registered on" },
              { render: "Details" },
            ]}
            classNames={{
              root: "bg-white rounded-lg shadow",
            }}
            rows={filteredCampusAmbassador.map((r, i) => ({
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
                  render: formatDate(r.createdAt),
                },
                {
                  render: (
                    <Button radius={999} onClick={() => setActiveAmbId(r.id)}>
                      Click
                    </Button>
                  ),
                },
              ],
            }))}
          />
        )}
      </div>
      <Modal
        size={"xl"}
        centered
        classNames={{
          title: "font-medium",
        }}
        title={
          data?.data.find((amb) => amb.id === activeAmbId)?.firstName +
          " details"
        }
        onClose={() => setActiveAmbId(null)}
        opened={!!activeAmbId}
      >
        {(() => {
          const currentAmb = data?.data.find((amb) => amb.id === activeAmbId);
          if (!currentAmb)
            return <Alert color="red" title="Invalid ambassador selected" />;
          return (
            <div className="grid gap-6">
              <div className="flex gap-3">
                <LabelAndValue
                  label="Name"
                  value={
                    currentAmb.firstName + " " + (currentAmb.lastName ?? "")
                  }
                />
                <LabelAndValue label="Email" value={currentAmb.email} />
                <LabelAndValue label="Mobile" value={currentAmb.mobile} />
              </div>
              <div className="flex gap-3">
                <LabelAndValue
                  label="Education type"
                  value={currentAmb.eduType}
                />
                <LabelAndValue
                  label="Date of birth"
                  value={formatDate(currentAmb.dob)}
                />
                <LabelAndValue label="LinkedIn" value={currentAmb.linkedin} />
              </div>
              <div className="flex gap-3">
                <LabelAndValue
                  label="College Name"
                  value={currentAmb.collegeName}
                />
                <LabelAndValue label="City" value={currentAmb.collegeCity} />
                <LabelAndValue label="Year" value={currentAmb.yearInCollege} />
                <LabelAndValue label="Dept." value={currentAmb.department} />
              </div>
              <LabelAndValue
                label="Registered On"
                value={formatDate(currentAmb.createdAt)}
              />
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
