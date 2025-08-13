import { Breadcrumbs } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

function BlogBread() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Create breadcrumb items
  const items = [
    {
      title:
        decodeURIComponent(pathnames[0]).charAt(0).toUpperCase() +
        decodeURIComponent(pathnames[0]).slice(1),
      href: `/${pathnames[0].toLowerCase()}`,
    },
    {
      title:
        decodeURIComponent(pathnames[1]).charAt(0).toUpperCase() +
        decodeURIComponent(pathnames[1]).slice(1),
      href: `/${pathnames[1].toLowerCase()}`,
    },
    (() => {
      let blog_slug = decodeURIComponent(pathnames[2]).split("-");
      blog_slug = blog_slug.slice(0, blog_slug.length - 1);
      blog_slug = blog_slug.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1),
      );
      return {
        title: blog_slug.join(" "),
        href: `/${pathnames[2].toLowerCase()}`,
      };
    })(),
  ];

  const breadcrumbItems = items.map((item, index) => (
    <Link
      to={item.href}
      className="font-sans font-semibold truncate pb-[2px]"
      key={index}
    >
      {item.title}
    </Link>
  ));

  return (
    <>
      <Breadcrumbs separator=">">{breadcrumbItems}</Breadcrumbs>
    </>
  );
}

export default BlogBread;
