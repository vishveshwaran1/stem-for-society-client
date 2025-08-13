import { Button } from "@mantine/core";
import { ArrowLeft, RefreshCcw, RefreshCw } from "lucide-react";
import { ErrorBoundary as ErrBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

export default function ErrorBoundary({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  return (
    <ErrBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="border bg-red-50 rounded-md m-2 gap-7 p-6 flex flex-1 justify-center items-center flex-col">
          <h4 className="text-[2rem] text-red-500 font-medium">
            Oops! We encountered an error!
          </h4>
          <div className="bg-gray-50 w-full p-6 font-mono text-sm text-red-500 font-light">
            {error.message}
            {error.stack}
          </div>
          <div className="flex gap-2">
            <Button
              radius={999}
              onClick={() => navigate(-1)}
              variant="subtle"
              bg={"red"}
              leftSection={<ArrowLeft size={16} />}
              color="white"
            >
              Back
            </Button>
            <Button
              radius={999}
              onClick={resetErrorBoundary}
              variant="subtle"
              leftSection={<RefreshCw size={16} />}
              bg={"red"}
              color="white"
            >
              Try again
            </Button>
            <Button
              radius={999}
              onClick={() => location.reload()}
              leftSection={<RefreshCcw size={16} />}
              variant="subtle"
              bg={"red"}
              color="white"
            >
              Reload
            </Button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrBoundary>
  );
}
