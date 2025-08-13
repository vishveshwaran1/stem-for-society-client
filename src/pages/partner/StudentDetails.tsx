export default function StudentDetails() {
  const student = {
    name: "John Doe",
    phone: "1234567890",
    email: "johndoe@example.com",
    address: "123 Main Street, Springfield",
    city: "Springfield",
    state: "Illinois",
    pincode: "62704",
    status: "Active",
    other: "Additional Info Here",
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white w-full min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-semibold mb-6 text-left">
            Student Details
          </h1>
          <div className="flex flex-row gap-32">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  Name{" "}
                </span>
                <span className="mt-2 text-lg font-semibold">
                  {student.name}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  Phone{" "}
                </span>
                <span className="mt-2 text-lg font-semibold">
                  {student.phone}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  Email{" "}
                </span>
                <span className="mt-2 text-lg font-semibold">
                  {student.email}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  Address{" "}
                </span>
                <span className="mt-2 text-lg font-semibold">
                  {student.address}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  City{" "}
                </span>
                <span className="mt-2 text-lg font-semibold">
                  {student.city}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  State{" "}
                </span>
                <span className="mt-2 text-lg font-semibold">
                  {student.state}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  Pincode{" "}
                </span>
                <span className="mt-2 text-lg font-semibold">
                  {student.pincode}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg underline underline-offset-4">
                  Status{" "}
                </span>
                <span
                  className={`${
                    student.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-medium`}
                >
                  <span className="ml-4 mt-2 text-lg font-semibold">
                    {student.status}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
