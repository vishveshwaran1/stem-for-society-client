import Table from "../../components/Table";

export default function AdminTransactions() {
  const transactions = [
    {
      id: 1,
      courseName: "Web Development 101",
      paidBy: "John Doe",
      amount: "5000 INR",
      date: "2024-12-10",
      status: "Completed",
    },
    {
      id: 2,
      courseName: "Advanced Python",
      paidBy: "Jane Smith",
      amount: "3500 INR",
      date: "2024-12-09",
      status: "Pending",
    },
    {
      id: 3,
      courseName: "Data Science Bootcamp",
      paidBy: "Mark Lee",
      amount: "6000 INR",
      date: "2024-12-08",
      status: "Completed",
    },
    // Add more transaction data as needed
  ];

  return (
    <div className="flex flex-col items-center gap-4 mt-20 p-4">
      <div className="control-bar w-full mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <input
          className="px-4 py-2 rounded"
          placeholder="Search Transactions"
        />
      </div>
      <div className="w-full">
        <Table
          headers={[
            { id: 1, render: "S.No", className: "w-[10%]" },
            { id: 2, render: "Course Name" },
            { id: 3, render: "Paid By" },
            { id: 4, render: "Amount" },
            { id: 5, render: "Date" },
            { id: 6, render: "Transaction Status" },
          ]}
          rows={transactions.map((transaction, i) => ({
            id: transaction.id,
            cells: [
              {
                render: i + 1,
                className: "w-[10%]",
              },
              {
                render: transaction.courseName,
              },
              {
                render: transaction.paidBy,
              },
              {
                render: transaction.amount,
              },
              {
                render: transaction.date,
              },
              {
                render: (
                  <span
                    className={`${
                      transaction.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    } font-medium`}
                  >
                    {transaction.status}
                  </span>
                ),
              },
            ],
          }))}
        />
      </div>
    </div>
  );
}
