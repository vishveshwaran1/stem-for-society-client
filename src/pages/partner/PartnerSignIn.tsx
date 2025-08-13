import { Button, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { usePartner } from "../../lib/hooks";

type PartnerSignInForm = {
  email: string;
  password: string;
};

export default function PartnerSignIn() {
  const { user } = usePartner();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PartnerSignInForm>({
    email: "",
    password: "",
  });

  const { signIn, isSigningIn } = usePartner({
    extraOnSuccess: () => navigate("/partner"),
  });

  const handleSubmit = () => {
    signIn(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (user) return <Navigate to={"/partner"} />;

  return (
    <div className="h-full justify-center flex w-full items-center">
      <div className="flex items-center justify-center flex-col w-full gap-3 my-10 rounded-lg">
        <Title order={1}>Login</Title>
        <Text size="lg">Enter your credentials to proceed further</Text>
        <div className="flex flex-col justify-center items-center p-3 w-full gap-2">
          <TextInput
            label="Email Address"
            placeholder="Enter your email"
            size="md"
            className="w-full lg:w-2/3"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            size="md"
            className="w-full lg:w-2/3"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            radius={999}
            w="400"
            disabled={isSigningIn}
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div className="lg:w-2/3 flex flex-row gap-2">
            <Text ta="left" fw={500}>
              Want to partner with us?
            </Text>
            <Link to={"/partner/signup"}>
              <Text ta="left" c="blue" fw={500}>
                Sign up now
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
