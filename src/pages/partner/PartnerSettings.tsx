import { Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import PartnerErrorHandler from "../../components/PartnerErrorHandler";
import { usePartner, usePartnerProfileData } from "../../lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GenericError, GenericResponse } from "../../lib/types";
import { AxiosError } from "axios";
import { api } from "../../lib/api";
import { mutationErrorHandler } from "../../lib/utils";
import { toast } from "react-toastify";

type ProfileDefault = {
  companyName: string;
  email: string;
  cinOrGst: string;
  firstName: string;
  lastName?: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
};

function usePartnerProfileSubmit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<GenericResponse, AxiosError<GenericError>, ProfileDefault>(
    {
      mutationFn: async (data) => {
        return (await api("partnerAuth").post("/partner/misc/profile", data))
          .data;
      },
      onError: (err) => mutationErrorHandler(err, navigate, "/partner/"),
      onSuccess(data) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["partner", "profile"] });
      },
    },
  );
}

export default function PartnerSettings() {
  const { user, isLoading, error } = usePartner();
  const {
    isLoading: partnerProfileLoading,
    error: partnerProfileError,
    data: partnerProfile,
  } = usePartnerProfileData();
  const { isPending: profileSaving, mutate: saveProfile } =
    usePartnerProfileSubmit();

  const [formData, setFormData] = useState<ProfileDefault>({
    companyName: "",
    email: "",
    cinOrGst: "",
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (partnerProfile) {
      setFormData((prevData) => ({
        ...prevData,
        state: partnerProfile.address?.state || "",
        addressLine1: partnerProfile.address?.addressLine1 || "",
        cinOrGst: partnerProfile.gst || "",
        city: partnerProfile.address?.city || "",
        companyName: partnerProfile.institutionName || "",
        email: partnerProfile.email || "",
        firstName: partnerProfile.firstName,
        lastName: partnerProfile.lastName ?? undefined,
        phone: partnerProfile.mobile || "",
        pincode: partnerProfile.address?.pincode || "",
      }));
    }
  }, [partnerProfile]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (isLoading || partnerProfileLoading) {
    return <Loading />;
  }

  if (error || partnerProfileError)
    return <PartnerErrorHandler error={error || partnerProfileError!} />;

  if (!user) return <Navigate to={"/partner"} />;

  return (
    <div className="p-4 space-y-3 w-full justify-center items-center h-full">
      <h4>View and edit profile settings here</h4>
      <TextInput
        label="Instructor First name"
        placeholder="Enter your first name"
        size="sm"
        className="lg:w-2/3 w-full"
        required
        name="instructorName"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <TextInput
        label="Instructor Last name"
        placeholder="Enter your last name"
        size="sm"
        className="lg:w-2/3 w-full"
        required
        name="instructorName"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <TextInput
        label="Phone No."
        placeholder="Enter your phone"
        size="sm"
        className="lg:w-2/3 w-full"
        required
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
      />
      <TextInput
        label="City"
        placeholder=""
        size="sm"
        className="lg:w-2/3 w-full"
        name="city"
        required
        value={formData.city}
        onChange={handleInputChange}
      />
      <TextInput
        label="State"
        placeholder=""
        size="sm"
        className="lg:w-2/3 w-full"
        name="state"
        required
        value={formData.state}
        onChange={handleInputChange}
      />
      <TextInput
        label="Pincode"
        placeholder=""
        size="sm"
        className="lg:w-2/3 w-full"
        name="pincode"
        type="number"
        required
        value={formData.pincode}
        onChange={handleInputChange}
      />
      <TextInput
        label="Email Address"
        placeholder="Enter your email"
        size="sm"
        type="email"
        className="lg:w-2/3 w-full"
        required
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <Button
        radius={999}
        disabled={profileSaving}
        type="submit"
        onClick={() => {
          saveProfile(formData);
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}
