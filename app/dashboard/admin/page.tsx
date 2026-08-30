import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { profiles, pages, subscriptions, blockClicks } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export default async function AdminDashboardPage() {
  // Enforce God-mode access
  await requireAdmin();

  // Fetch Aggregate Metrics
  const [
    [{ count: totalUsers }],
    [{ count: totalPublished }],
    [{ count: totalClicks }],
    [{ count: totalSubs }]
  ] = await Promise.all([
    db.select({ count: count() }).from(profiles),
    db.select({ count: count() }).from(pages).where(eq(pages.isPublished, true)),
    db.select({ count: count() }).from(blockClicks),
    db.select({ count: count() }).from(subscriptions).where(eq(subscriptions.status, "active"))
  ]);

  // Fetch Recent Signups
  const recentProfiles = await db.query.profiles.findMany({
    orderBy: (profiles, { desc }) => [desc(profiles.createdAt)],
    limit: 10,
  });

  return (
    <div className="flex flex-col gap-8 px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-red-600">God Mode</h1>
        <p className="text-muted-foreground">
          Platform-wide metrics and user management.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered profiles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPublished}</div>
            <p className="text-xs text-muted-foreground">Live websites</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Network Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">All block clicks across network</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubs}</div>
            <p className="text-xs text-muted-foreground">Paying customers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Username</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {recentProfiles.map((p) => (
                  <tr key={p.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">@{p.username}</td>
                    <td className="p-4 align-middle">
                      {p.createdAt ? formatDistanceToNow(p.createdAt, { addSuffix: true }) : "Unknown"}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <a href={`/@${p.username}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                        View Page
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
