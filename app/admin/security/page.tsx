import { SecurityDashboard } from "@/components/admin/security-dashboard"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security Monitor</h1>
        <p className="text-muted-foreground">Monitor and manage system security</p>
      </div>

      <SecurityDashboard />
    </div>
  )
}
