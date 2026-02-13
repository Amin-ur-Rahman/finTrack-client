import AdminDashboardLayout from "../layout";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Platform overview and management
        </p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-primary mt-2">1,234</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Users
          </h3>
          <p className="text-2xl font-bold text-success mt-2">856</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Categories
          </h3>
          <p className="text-2xl font-bold text-foreground mt-2">24</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Transactions
          </h3>
          <p className="text-2xl font-bold text-foreground mt-2">15,678</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Activity
        </h3>
        <p className="text-muted-foreground">
          Platform activity will appear here
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-4 py-3  text-muted-foreground hover:text-primary hover:font-semibold  rounded-md  transition-all hover:cursor-pointer border border-muted">
            View All Users
          </button>
          <button className="px-4 py-3  text-muted-foreground hover:text-primary hover:font-semibold  rounded-md  transition-all hover:cursor-pointer border border-muted">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
