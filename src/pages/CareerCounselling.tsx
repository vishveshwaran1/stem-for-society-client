import {
  Alert,
  Button,
  List,
  SegmentedControl,
  Select,
  TextInput,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import CareerWhyChooseUs from "../components/CareerWhyChooseUs";
import { api } from "../lib/api";
import {
  GenericError,
  GenericResponse,
  RazorpayOrderOptions,
} from "../lib/types";
import { initializeRazorpay, mutationErrorHandler } from "../lib/utils";
import CareerCounPricingPage from "./CareerCounPricing";
import { CreatePaymentResponse } from "./TrainingSpotlight";
import { RZPY_KEYID } from "../Constants";

//Photo by <a href="https://unsplash.com/@wocintechchat?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Christina @ wocintechchat.com</a> on <a href="https://unsplash.com/photos/shallow-focus-photo-of-woman-in-beige-open-cardigan-rCyiK4_aaWw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

const careerCounsellingServices = [
  "Career choice",
  "CV/Resume prep",
  "Research Proposal editing",
  "LOR/SOP editing & preparation",
  "Shortlisting Abroad PhD",
  "PG/PhD abroad application guidance",
  "Post Doc Application",
  "Industry jobs",
] as const;

type CareerCounsellingServiceType = (typeof careerCounsellingServices)[number];

type CareerCounsellingForm = {
  firstName: string;
  lastName?: string;
  email: string;
  mobile: string;
  service?: CareerCounsellingServiceType;
  plan?: "Basics" | "Premium";
};

function useRegisterCareer() {
  return useMutation<
    GenericResponse<CreatePaymentResponse>,
    AxiosError<GenericError>,
    CareerCounsellingForm,
    unknown
  >({
    mutationFn: async (data) => {
      const response = await api().post("/enquiry/career", data);
      return response.data;
    },
    onError: (err) => mutationErrorHandler(err),
  });
}

export default function CareerCounselling() {
  const [formData, setFormData] = useState<CareerCounsellingForm>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [switchPlanOrService, setSwitchPlanOrService] = useState<
    "plans" | "services"
  >("services");
  const { isPending, mutateAsync } = useRegisterCareer();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = useCallback(async () => {
    try {
      const rzrpyInit = await initializeRazorpay();
      if (!rzrpyInit) return toast.error("Unable to initialize payment!");

      const data = await mutateAsync(formData);

      console.log("🚀 ~ handlePayment ~ data:", data);

      if (!data || !data.data) {
        toast.error("Something went wrong in creating payment!");
        return;
      }
      const order = data.data;

      const options: RazorpayOrderOptions = {
        key: RZPY_KEYID,
        amount: Number(order.amount) * 100,
        currency: "INR",
        name: "Stem for Society",
        description: formData.service
          ? `Purchase ${formData.service} service`
          : "Premium plan purchase",
        image: "https://stem-4-society.netlify.app/logo-01.png",
        order_id: order.orderId,
        prefill: {
          name: formData.firstName + " " + (formData.lastName ?? ""),
          email: formData.email,
          contact: formData.mobile,
        },
        async handler() {
          toast.success(
            "Payment was made successfully! We will verify the payment and will be in touch with you shortly",
            { autoClose: false, draggable: false },
          );
        },
      };

      // @ts-expect-error dhe chi pae
      const rzp: RazorpayInstance = new Razorpay(options);

   
      rzp.on("payment.failed", (res) => {
        console.log("Failure:", res);
        toast.error("Payment failed! Reason:\n" + res.error.description, {
          autoClose: false,
          closeOnClick: false,
        });
        toast.error(
          "Please note Order ID: " +
            res.error.metadata.order_id +
            "\n Payment ID: " +
            res.error.metadata.payment_id,
          { autoClose: false, closeOnClick: false },
        );
      });

      rzp.open();
    } catch {
      toast.error("Something went wrong in the paymnent process");
    }
  }, [formData, mutateAsync]);

  return (
    <div className="container mx-auto px-4 lg:w-[80%] md:w-[60%] my-12 grid gap-7">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
        Career Counselling
      </h2>
      <div className="grid lg:grid-cols-2">
        <img
          src="/careercoun.svg"
          alt="Career Counselling"
          className="rounded-xl"
        />
        <div className="p-4 space-y-3">
          <p className="text-lg text-justify text-gray-600">
            <span className="font-bold text-pink-800">Stem For Society</span>{" "}
            provide{" "}
            <span className="font-bold text-pink-800">career counselling</span>{" "}
            services by guide individuals in making career choices by assessing
            their interests, skills, and goals. These services offer
            personalized advice, resources, and support to navigate education
            paths, job opportunities, and industry trends. By addressing
            career-related concerns, they empower individuals to build
            fulfilling careers and achieve long-term professional success.{" "}
            <span className="font-bold">
              Stem for Society has 200+ subject experts as mentor across
              globally
            </span>
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 justify-center gap-6">
        <div className="flex flex-col gap-8">
          <h3 className="font-semibold text-xl">
            Stem for Society Support students/Individuals On crafting their
            right career path by guiding them in
          </h3>
          <List
            spacing="xs"
            size="md"
            center
            icon={<CheckCircle color="green" size={18} />}
            display={"grid"}
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {careerCounsellingServices.map((item, index) => (
              <List.Item key={index}>{item}</List.Item>
            ))}
          </List>
        </div>
        <div className="text-lg flex flex-col gap-2 w-full">
          <p>Please fill up the details and we will be in touch</p>
          <TextInput
            label="First name"
            placeholder="Enter your first name"
            size="sm"
            className="w-full"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            size="sm"
            className="w-full"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextInput
            label="Mobile No."
            placeholder="Enter mobile number"
            size="sm"
            className="w-full"
            required
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <TextInput
            label="Email Address"
            placeholder="Enter email"
            size="sm"
            type="email"
            className="w-full"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <SegmentedControl
            data={[
              { label: "Choose service", value: "services" },
              { label: "Choose plans", value: "plans" },
            ]}
            value={switchPlanOrService}
            onChange={(val) => {
              setFormData((prev) => ({
                ...prev,
                [val === "services" ? "plan" : "service"]: undefined,
              }));
              setSwitchPlanOrService(val as "services" | "plans");
            }}
          />
          {switchPlanOrService === "services" && (
            <Select
              data={careerCounsellingServices}
              size="sm"
              className="w-full"
              label="Service required"
              placeholder="Choose from a list of services"
              value={formData.service}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  service: val as CareerCounsellingServiceType,
                }))
              }
            />
          )}
          {switchPlanOrService === "plans" && (
            <Select
              data={["Basics", "Premium"]}
              size="sm"
              className="w-full"
              label="Plan"
              placeholder="Choose from our plans"
              value={formData.plan}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  plan: val as "Basics" | "Premium",
                }))
              }
            />
          )}
          <Button
            disabled={isPending}
            onClick={handlePayment}
            w={"fit-content"}
          >
            Submit
          </Button>
          <Alert
            color="yellow"
            classNames={{ message: "text-yellow-800" }}
            icon={<AlertCircle />}
          >
            We will be contacting you within 48 hrs.
          </Alert>
        </div>
      </div>
      <CareerWhyChooseUs />
      <CareerCounPricingPage />
    </div>
  );
}
