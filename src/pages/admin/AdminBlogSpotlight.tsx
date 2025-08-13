import { Button } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BlogContent from "../../components/BlogContent";
import Errorbox from "../../components/Errorbox";
import Loading from "../../components/Loading";
import { api, queryClient } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { mutationErrorHandler } from "../../lib/utils";
import { Blog } from "../BlogListing";

export type AdminBlogDetails = Blog & {
  approvedBy: string;
  blogAuthor: Blog["blogAuthor"] & {
    linkedin: string;
    mobile: string;
    email: string;
  };
};

function useAdminBlogDetails(id: string) {
  return useQuery<GenericResponse<AdminBlogDetails>, AxiosError<GenericError>>({
    queryKey: ["admin", "blogs", id],
    queryFn: async () => (await api("adminAuth").get(`/blogs/${id}`)).data,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Ensure query only runs if `id` is defined
  });
}

function useAdminBlogsApproval(id?: string) {
  const navigate = useNavigate();
  return useMutation<
    GenericResponse,
    AxiosError<GenericError>,
    "approve" | "reject"
  >({
    mutationFn: async (data) =>
      (await api("adminAuth").post(`/blogs/${id}/approve`, { intent: data }))
        .data,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs", id] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
    },
    onError: (err) => mutationErrorHandler(err, navigate, "/admin/signin"),
  });
}

export default function AdminBlogSpotlight() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useAdminBlogDetails(id || "");
  const { mutate, isPending } = useAdminBlogsApproval(id);

  useEffect(() => {
    if (error) mutationErrorHandler(error, navigate, "/admin/signin");
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Errorbox message={error.message} />;
  }

  const blog = data?.data;

  return (
    <div className="w-full mt-4">
      <div className="max-w-7xl h-full mx-auto flex flex-col px-4">
        {!blog || Object.keys(blog).length === 0 ? (
          <Errorbox message="No data! Must be an invalid link. Please refresh or go back and try again" />
        ) : (
          <>
            <div className=" flex flex-col gap-2">
              <div className="w-full">
                <Button
                  radius={999}
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
              </div>
              <span className="mt-2 text-xl md:text-3xl font-semibold">
                {blog.title}
              </span>
              <div className="mt-5 flex gap-4">
                <img
                  src={blog.coverImage ?? undefined}
                  alt={blog.title}
                  className="w-2/3 object-cover aspect-video rounded-lg"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Author Details</span>
                  <h4 className="font-medium">
                    Name:{" "}
                    <span className="font-normal">{blog.blogAuthor.name}</span>
                  </h4>
                  <h4 className="font-medium">
                    LinkedIn:{" "}
                    <span className="font-normal">
                      {blog.blogAuthor.linkedin}
                    </span>
                  </h4>
                  <h4 className="font-medium">
                    Email:{" "}
                    <span className="font-normal">{blog.blogAuthor.email}</span>
                  </h4>
                  <h4 className="font-medium">
                    Mobile:{" "}
                    <span className="font-normal">
                      {blog.blogAuthor.mobile}
                    </span>
                  </h4>
                  <h4 className="font-medium">
                    References:{" "}
                    <ul className="font-normal">
                      {blog.references?.map((ref) => (
                        <Link key={ref} to={ref} target="_blank">
                          <li>{ref}</li>
                        </Link>
                      ))}
                    </ul>
                  </h4>
                </div>
              </div>

              <BlogContent markdownContent={blog.content}></BlogContent>
            </div>
            <div className="flex justify-start gap-4 mt-5">
              {!blog.approvedBy ? (
                <Button
                  radius={999}
                  variant="filled"
                  color="green"
                  className="text-xs sm:text-sm md:text-base"
                  onClick={() => mutate("approve")}
                  disabled={isPending || isLoading}
                >
                  Approve
                </Button>
              ) : (
                <Button
                  radius={999}
                  variant="filled"
                  color="red"
                  className="text-xs sm:text-sm md:text-base"
                  onClick={() => mutate("reject")}
                  disabled={isPending || isLoading}
                >
                  Reject
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
