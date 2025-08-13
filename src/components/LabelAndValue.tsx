type LabelAndValueProps = {
  label: string;
  value: string | React.ReactNode;
};

export default function LabelAndValue({ label, value }: LabelAndValueProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="text-sm text-gray-700">{label}</span>
      <p>{value ?? <i className="text-gray-500">No data</i>}</p>
    </div>
  );
}
