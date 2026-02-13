import UserDashboardLayout from "./layout";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s your financial overview
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards will go here */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Income
          </h3>
          <p className="text-2xl font-bold text-success mt-2">৳50,000</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold text-danger mt-2">৳30,000</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Current Balance
          </h3>
          <p className="text-2xl font-bold text-primary mt-2">৳20,000</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Transactions
        </h3>
        <p className="text-muted-foreground">
          Your transactions will appear here
        </p>
      </div>
    </div>
  );
}
