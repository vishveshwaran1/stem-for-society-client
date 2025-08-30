// import { Button, TextInput } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading";
// import PartnerErrorHandler from "../../components/PartnerErrorHandler";
// import { usePartner, usePartnerProfileData } from "../../lib/hooks";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { GenericError, GenericResponse } from "../../lib/types";
// import { AxiosError } from "axios";
// import { api } from "../../lib/api";
// import { mutationErrorHandler } from "../../lib/utils";
// import { toast } from "react-toastify";

// type ProfileDefault = {
//   companyName: string;
//   email: string;
//   cinOrGst: string;
//   firstName: string;
//   lastName?: string;
//   phone: string;
//   addressLine1: string;
//   city: string;
//   state: string;
//   pincode: string;
//   logo?: File | null;
//   digitalSign?: File | null;
// };

// function usePartnerProfileSubmit() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   return useMutation<GenericResponse, AxiosError<GenericError>, FormData>(
//     {
//       mutationFn: async (data) => {
//         return (await api("partnerAuth").post("/partner/misc/profile", data, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         })).data;
//       },
//       onError: (err) => mutationErrorHandler(err, navigate, "/partner/"),
//       onSuccess(data) {
//         toast.success(data.message);
//         queryClient.invalidateQueries({ queryKey: ["partner", "profile"] });
//       },
//     },
//   );
// }

// export default function PartnerSettings() {
//   const { user, isLoading, error } = usePartner();
//   const {
//     isLoading: partnerProfileLoading,
//     error: partnerProfileError,
//     data: partnerProfile,
//   } = usePartnerProfileData();
//   const { isPending: profileSaving, mutate: saveProfile } =
//     usePartnerProfileSubmit();

//   const [formData, setFormData] = useState<ProfileDefault>({
//     companyName: "",
//     email: "",
//     cinOrGst: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     addressLine1: "",
//     city: "",
//     state: "",
//     pincode: "",
//     logo: null,
//     digitalSign: null,
//   });

//   // State for image previews and current images from server
//   const [logoPreview, setLogoPreview] = useState<string>("");
//   const [digitalSignPreview, setDigitalSignPreview] = useState<string>("");
//   const [currentLogoUrl, setCurrentLogoUrl] = useState<string>("");
//   const [currentDigitalSignUrl, setCurrentDigitalSignUrl] = useState<string>("");

//   useEffect(() => {
//     if (partnerProfile) {
//       setFormData((prevData) => ({
//         ...prevData,
//         state: partnerProfile.address?.state || "",
//         addressLine1: partnerProfile.address?.addressLine1 || "",
//         cinOrGst: partnerProfile.gst || "",
//         city: partnerProfile.address?.city || "",
//         companyName: partnerProfile.institutionName || "",
//         email: partnerProfile.email || "",
//         firstName: partnerProfile.firstName || "",
//         lastName: partnerProfile.lastName ?? "",
//         phone: partnerProfile.mobile || "",
//         pincode: partnerProfile.address?.pincode || "",
//         logo: null,
//         digitalSign: null,
//       }));

//       // Set current image URLs from server (Supabase URLs are already complete)
//       setCurrentLogoUrl(partnerProfile.logo || "");
//       setCurrentDigitalSignUrl(partnerProfile.digitalSign || "");
      
//       // Clear previews when new data comes from server
//       setLogoPreview("");
//       setDigitalSignPreview("");
//     }
//   }, [partnerProfile]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'logo' | 'digitalSign') => {
//     const file = event.target.files?.[0] || null;
//     setFormData((prevData) => ({
//       ...prevData,
//       [fieldName]: file,
//     }));

//     // Create preview URL and clear current image URL
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       if (fieldName === 'logo') {
//         setLogoPreview(previewUrl);
//         setCurrentLogoUrl(""); // Hide server image when new file selected
//       } else {
//         setDigitalSignPreview(previewUrl);
//         setCurrentDigitalSignUrl(""); // Hide server image when new file selected
//       }
//     } else {
//       if (fieldName === 'logo') {
//         setLogoPreview("");
//       } else {
//         setDigitalSignPreview("");
//       }
//     }
//   };

//   const handleSaveChanges = () => {
//     const submitData = new FormData();
    
//     // Always append required fields (these are required by backend validation)
//     submitData.append('email', formData.email);
//     submitData.append('firstName', formData.firstName);
//     submitData.append('phone', formData.phone);
//     submitData.append('city', formData.city);
//     submitData.append('state', formData.state);
//     submitData.append('pincode', formData.pincode);
    
//     // Append optional fields only if they have values
//     if (formData.lastName && formData.lastName.trim() !== '') {
//       submitData.append('lastName', formData.lastName);
//     }
    
//     if (formData.companyName && formData.companyName.trim() !== '') {
//       submitData.append('institutionName', formData.companyName);
//     }
    
//     if (formData.cinOrGst && formData.cinOrGst.trim() !== '') {
//       submitData.append('gst', formData.cinOrGst);
//     }
    
//     // Append files only if new files are selected
//     if (formData.logo instanceof File) {
//       submitData.append('logo', formData.logo);
//     }
//     if (formData.digitalSign instanceof File) {
//       submitData.append('digitalSign', formData.digitalSign);
//     }
    
//     saveProfile(submitData);
//   };

//   // Cleanup preview URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       if (logoPreview && logoPreview.startsWith('blob:')) {
//         URL.revokeObjectURL(logoPreview);
//       }
//       if (digitalSignPreview && digitalSignPreview.startsWith('blob:')) {
//         URL.revokeObjectURL(digitalSignPreview);
//       }
//     };
//   }, [logoPreview, digitalSignPreview]);

//   // Check if form is valid (required fields are filled)
//   const isFormValid = () => {
//     return formData.email && 
//            formData.firstName && 
//            formData.phone && 
//            formData.city && 
//            formData.state && 
//            formData.pincode;
//   };

//   if (isLoading || partnerProfileLoading) {
//     return <Loading />;
//   }

//   if (error || partnerProfileError)
//     return <PartnerErrorHandler error={error || partnerProfileError!} />;

//   if (!user) return <Navigate to={"/partner"} />;

//   return (
//     <div className="p-4 space-y-3 w-full justify-center items-center h-full">
//       <h4>View and edit profile settings here</h4>
      
//       <TextInput
//         label="Instructor First name"
//         placeholder="Enter your first name"
//         size="sm"
//         className="lg:w-2/3 w-full"
//         required
//         name="instructorName"  // Fixed: was "instructorName"
//         value={formData.firstName}
//         onChange={handleInputChange}
//       />
      
//       <TextInput
//         label="Instructor Last name"
//         placeholder="Enter your last name"
//         size="sm"
//         className="lg:w-2/3 w-full"
//         name="instructorName"  // Fixed: was "instructorName"
//         value={formData.lastName || ""}
//         onChange={handleInputChange}
//       />
      
//       <TextInput
//         label="Phone No."
//         placeholder="Enter your phone"
//         size="sm"
//         className="lg:w-2/3 w-full"
//         required
//         name="phone"
//         value={formData.phone}
//         onChange={handleInputChange}
//       />
      
//       <TextInput
//         label="City"
//         placeholder="Enter city"
//         size="sm"
//         className="lg:w-2/3 w-full"
//         name="city"
//         required
//         value={formData.city}
//         onChange={handleInputChange}
//       />
      
//       <TextInput
//         label="State"
//         placeholder="Enter state"
//         size="sm"
//         className="lg:w-2/3 w-full"
//         name="state"
//         required
//         value={formData.state}
//         onChange={handleInputChange}
//       />
      
//       <TextInput
//         label="Pincode"
//         placeholder="Enter pincode"
//         size="sm"
//         className="lg:w-2/3 w-full"
//         name="pincode"
//         type="number"
//         required
//         value={formData.pincode}
//         onChange={handleInputChange}
//       />
      
//       <TextInput
//         label="Email Address"
//         placeholder="Enter your email"
//         size="sm"
//         type="email"
//         className="lg:w-2/3 w-full"
//         required
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//       />

//       {/* Logo Upload Section */}
//       <div className="lg:w-2/3 w-full space-y-2">
//         <label className="block text-sm font-medium text-gray-700">Company Logo</label>
        
//         {/* Show current image from server OR new preview */}
//         {(logoPreview || currentLogoUrl) && (
//           <div className="mb-3">
//             <img
//               src={logoPreview || currentLogoUrl}
//               alt="Company Logo"
//               className="w-32 h-32 object-cover rounded-lg border border-gray-300"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {logoPreview ? "New logo selected" : "Current logo"}
//             </p>
//           </div>
//         )}
        
//         <div className="flex items-center space-x-3">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleFileChange(e, 'logo')}
//             className="hidden"
//             id="logo-upload"
//           />
//           <label
//             htmlFor="logo-upload"
//             className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
//           >
//             {currentLogoUrl || logoPreview ? "Change Logo" : "Upload Logo"}
//           </label>
//           {formData.logo && (
//             <span className="text-sm text-green-600">
//               ✓ {formData.logo.name}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Digital Sign Upload Section */}
//       <div className="lg:w-2/3 w-full space-y-2">
//         <label className="block text-sm font-medium text-gray-700">Digital Signature</label>
        
//         {/* Show current image from server OR new preview */}
//         {(digitalSignPreview || currentDigitalSignUrl) && (
//           <div className="mb-3">
//             <img
//               src={digitalSignPreview || currentDigitalSignUrl}
//               alt="Digital Signature"
//               className="w-32 h-32 object-cover rounded-lg border border-gray-300"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {digitalSignPreview ? "New signature selected" : "Current signature"}
//             </p>
//           </div>
//         )}
        
//         <div className="flex items-center space-x-3">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleFileChange(e, 'digitalSign')}
//             className="hidden"
//             id="digital-sign-upload"
//           />
//           <label
//             htmlFor="digital-sign-upload"
//             className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
//           >
//             {currentDigitalSignUrl || digitalSignPreview ? "Change Signature" : "Upload Signature"}
//           </label>
//           {formData.digitalSign && (
//             <span className="text-sm text-green-600">
//               ✓ {formData.digitalSign.name}
//             </span>
//           )}
//         </div>
//       </div>

//       <Button
//         radius={999}
//         disabled={profileSaving}
//         type="submit"
//         onClick={handleSaveChanges}
//       >
//         {profileSaving ? "Saving..." : "Save Changes"}
//       </Button>
//     </div>
//   );
// }


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
  logo?: File | null;
  digitalSign?: File | null;
};

function usePartnerProfileSubmit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<GenericResponse, AxiosError<GenericError>, FormData>({
    mutationFn: async (data) => {
      return (
        await api("partnerAuth").post("/partner/misc/profile", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;
    },
    onError: (err) => mutationErrorHandler(err, navigate, "/partner/"),
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["partner", "profile"] });
    },
  });
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
    logo: null,
    digitalSign: null,
  });

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [digitalSignPreview, setDigitalSignPreview] = useState<string>("");
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string>("");
  const [currentDigitalSignUrl, setCurrentDigitalSignUrl] =
    useState<string>("");

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
        firstName: partnerProfile.firstName || "",
        lastName: partnerProfile.lastName ?? "",
        phone: partnerProfile.mobile || "",
        pincode: partnerProfile.address?.pincode || "",
        logo: null,
        digitalSign: null,
      }));

      setCurrentLogoUrl(partnerProfile.logo || "");
      setCurrentDigitalSignUrl(partnerProfile.digitalSign || "");
      setLogoPreview("");
      setDigitalSignPreview("");
    }
  }, [partnerProfile]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "logo" | "digitalSign"
  ) => {
    const file = event.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (fieldName === "logo") {
        setLogoPreview(previewUrl);
        setCurrentLogoUrl("");
      } else {
        setDigitalSignPreview(previewUrl);
        setCurrentDigitalSignUrl("");
      }
    } else {
      if (fieldName === "logo") {
        setLogoPreview("");
      } else {
        setDigitalSignPreview("");
      }
    }
  };

  const handleSaveChanges = () => {
    const submitData = new FormData();

    // Always append all fields (old values if unchanged)
    submitData.append("email", formData.email || "");
    submitData.append("firstName", formData.firstName || "");
    submitData.append("lastName", formData.lastName || "");
    submitData.append("phone", formData.phone || "");
    submitData.append("city", formData.city || "");
    submitData.append("state", formData.state || "");
    submitData.append("pincode", formData.pincode || "");
    submitData.append("institutionName", formData.companyName || "");
    submitData.append("gst", formData.cinOrGst || "");
    submitData.append("addressLine1", formData.addressLine1 || "");

    // Files only if new selected
    if (formData.logo instanceof File) {
      submitData.append("logo", formData.logo);
    }
    if (formData.digitalSign instanceof File) {
      submitData.append("digitalSign", formData.digitalSign);
    }

    saveProfile(submitData);
  };

  useEffect(() => {
    return () => {
      if (logoPreview && logoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
      if (digitalSignPreview && digitalSignPreview.startsWith("blob:")) {
        URL.revokeObjectURL(digitalSignPreview);
      }
    };
  }, [logoPreview, digitalSignPreview]);

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
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />

      <TextInput
        label="Instructor Last name"
        placeholder="Enter your last name"
        size="sm"
        className="lg:w-2/3 w-full"
        name="lastName"
        value={formData.lastName || ""}
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
        placeholder="Enter city"
        size="sm"
        className="lg:w-2/3 w-full"
        name="city"
        required
        value={formData.city}
        onChange={handleInputChange}
      />

      <TextInput
        label="State"
        placeholder="Enter state"
        size="sm"
        className="lg:w-2/3 w-full"
        name="state"
        required
        value={formData.state}
        onChange={handleInputChange}
      />

      <TextInput
        label="Pincode"
        placeholder="Enter pincode"
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

      {/* Logo Upload Section */}
      <div className="lg:w-2/3 w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Company Logo
        </label>

        {(logoPreview || currentLogoUrl) && (
          <div className="mb-3">
            <img
              src={logoPreview || currentLogoUrl}
              alt="Company Logo"
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">
              {logoPreview ? "New logo selected" : "Current logo"}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "logo")}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            {currentLogoUrl || logoPreview ? "Change Logo" : "Upload Logo"}
          </label>
          {formData.logo && (
            <span className="text-sm text-green-600">
              ✓ {formData.logo.name}
            </span>
          )}
        </div>
      </div>

      {/* Digital Sign Upload Section */}
      <div className="lg:w-2/3 w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Digital Signature
        </label>

        {(digitalSignPreview || currentDigitalSignUrl) && (
          <div className="mb-3">
            <img
              src={digitalSignPreview || currentDigitalSignUrl}
              alt="Digital Signature"
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">
              {digitalSignPreview ? "New signature selected" : "Current signature"}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "digitalSign")}
            className="hidden"
            id="digital-sign-upload"
          />
          <label
            htmlFor="digital-sign-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            {currentDigitalSignUrl || digitalSignPreview
              ? "Change Signature"
              : "Upload Signature"}
          </label>
          {formData.digitalSign && (
            <span className="text-sm text-green-600">
              ✓ {formData.digitalSign.name}
            </span>
          )}
        </div>
      </div>

      <Button
        radius={999}
        disabled={profileSaving}
        type="submit"
        onClick={handleSaveChanges}
      >
        {profileSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
