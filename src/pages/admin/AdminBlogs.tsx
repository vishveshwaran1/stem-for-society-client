import { Badge, Button, Input, Pill } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errorbox from "../../components/Errorbox";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import { api } from "../../lib/api";
import { GenericError, GenericResponse } from "../../lib/types";
import { formatDate, mutationErrorHandler } from "../../lib/utils";
import { Blog } from "../BlogListing";

type AdminBlogType = Blog & { approvedBy: string };

function useAdminBlogs() {
  return useQuery<GenericResponse<AdminBlogType[]>, AxiosError<GenericError>>({
    queryKey: ["admin", "blogs"],
    queryFn: async () => (await api("adminAuth").get("/blogs")).data,
    staleTime: 1000 * 60 * 5,
  });
}

export default function AdminBlogs() {
  const { data, isLoading, error } = useAdminBlogs();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string | undefined>("");

  const filteredBlogs = useMemo(() => {
    if (!data) return [];
    return data.data.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search?.toLowerCase() || "") ||
        blog.blogAuthor.name
          .toLowerCase()
          .includes(search?.toLowerCase() || "") ||
        (blog.references &&
          blog.references
            .join("")
            .toLowerCase()
            .includes(search?.toLowerCase() || "")) ||
        formatDate(blog.createdAt)
          .toLowerCase()
          .includes(search?.toLowerCase() || ""),
    );
  }, [data, search]);

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

  return (
    <div className="flex flex-col items-center gap-4 mt-20 p-4">
      <div className="control-bar w-full mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Input
          leftSection={<Search size={16} />}
          classNames={{ wrapper: "ml-auto w-64" }}
          placeholder="Search for blogs..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full">
        {!data ? (
          <Errorbox message="Cannot get data due to some unknown error" />
        ) : (
          <Table
            headers={[
              { render: "S.No", className: "w-[10%]" },
              { render: "Blog title" },
              { render: "Created by" },
              { render: "Reference DOI" },
              { render: "Created On" },
              { render: "Status" },
              { render: "Details", className: "w-[20%]" },
            ]}
            classNames={{
              root: "bg-white rounded-lg shadow",
            }}
            rows={filteredBlogs.map((r, i) => ({
              id: r.id,
              cells: [
                {
                  render: i + 1,
                  className: "w-[10%]",
                },
                {
                  render: r.title,
                },
                {
                  render: r.blogAuthor.name,
                },
                {
                  render: (
                    <div className="grid">
                      {r.references?.map((ref) => (
                        <Link key={ref} to={ref} target="_blank">
                          <Pill>{ref}</Pill>
                        </Link>
                      )) || "N/A"}
                    </div>
                  ),
                },
                {
                  render: formatDate(r.createdAt),
                },
                {
                  render: (
                    <Badge
                      color={r.approvedBy ? "green" : "gray"}
                      classNames={{ label: "font-normal" }}
                    >
                      {r.approvedBy ? "approved" : "pending"}
                    </Badge>
                  ),
                },
                {
                  render: (
                    <Link to={`/admin/blogs/${r.slug}`}>
                      <Button radius={999}>View details</Button>
                    </Link>
                  ),
                },
              ],
            }))}
          />
        )}
      </div>
    </div>
  );
}
