import React from "react";
import { cn } from "../lib/utils";

type Props = {
  title: string;
  value: string;
  rootClassName: string;
  titleClassName: string;
  valueClassName: string;
  icon: React.ReactNode;
};

export default function InfoCard({
  icon,
  rootClassName,
  titleClassName,
  valueClassName,
  title,
  value,
}: Props) {
  return (
    <div
      className={cn(
        "bg-green-100 flex flex-col rounded-md p-4 shadow-md w-64",
        rootClassName,
      )}
    >
      <span
        className={cn("text-green-800 font-medium text-lg", titleClassName)}
      >
        {title}
      </span>
      <div className="flex items-center gap-2">
        {icon}
        <span
          className={cn("text-green-800 font-medium text-lg", valueClassName)}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
