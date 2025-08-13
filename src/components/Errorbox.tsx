import { ServerCrashIcon } from "lucide-react";

type Props = {
  message: string;
};

export default function Errorbox({ message }: Props) {
  return (
    <div className="flex flex-col justify-center gap-4 h-full w-full bg-red-50 items-center p-12 rounded-md">
      <ServerCrashIcon color="red" size={80} />
      <div className="grid place-items-center">
        An error occured!
        <p className="text-red-500">{message}</p>
      </div>
    </div>
  );
}
