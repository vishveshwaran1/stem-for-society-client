import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdmin } from "../../lib/hooks";

type AdminSignInForm = {
  email: string;
  password: string;
};

export default function AdminSignIn() {
  const { user } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AdminSignInForm>({
    email: "",
    password: "",
  });

  const { signIn, isSigningIn } = useAdmin({
    extraOnSuccess: () => navigate("/admin/students"),
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

  if (user) return <Navigate to={"/admin/students"} />;

  return (
    <div className="h-full justify-center flex w-full  items-center" 
    style={{
          backgroundImage: `url(".../assets/backGround.png")`,
          backgroundPosition: 'center 75%',
        }}>
      <div className="w-full mt-4">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-row h-full w-full  mt-12">
            <div className="flex-1 flex items-center justify-center flex-col w-full gap-5 pl-10 pr-10 ">
              <div className="w-2/3">
                <Title order={1} mb={20}>
                  Admin Login
                </Title>
                <Text size="lg">Enter your credentials to proceed further</Text>
              </div>
              <TextInput
                label="Email Address"
                placeholder="Enter your email"
                size="md"
                className="w-2/3"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                size="md"
                name="password"
                className="w-2/3"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
