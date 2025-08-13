import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { GenericError } from "../lib/types";
import Errorbox from "./Errorbox";

export default function PartnerErrorHandler({
  error,
}: {
  error: AxiosError<GenericError>;
}) {
  const navigate = useNavigate();
  if (error) {
    const err =
      error.response && "error" in error.response.data
        ? error.response.data.error
        : null;
    if (err && error.response?.status === 401) {
      navigate("/partner/signin");
      return;
    }
    return (
      <Errorbox
        message={
          error.response && "error" in error.response.data
            ? error.response?.data.error
            : error.message
        }
      />
    );
  }
}
