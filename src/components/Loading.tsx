import { Loader } from "@mantine/core";
function Loading() {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-50/10">
      <Loader color="blue" />
    </div>
  );
}
export default Loading;
