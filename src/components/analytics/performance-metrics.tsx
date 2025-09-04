"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, AlertTriangle, Users } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { useSelector } from "react-redux"
import { selectAnalytics } from "@/store/selectors/analytics"

export function PerformanceMetrics() {
  const { performanceAnalytics: performance } = useSelector(selectAnalytics)

  // Mock data if performance is empty
  const performanceData = performance || {
    response_time_avg: 2.5,
    resolution_rate: 78,
    case_closure_rate: 85,
    user_satisfaction: 4.2,
    active_officers: 45,
    cases_per_officer: 8.3,
  }

  const metrics = [
    {
      title: "Average Response Time",
      value: `${performanceData.response_time_avg} hours`,
      icon: Clock,
      progress: Math.min((performanceData.response_time_avg / 5) * 100, 100),
      color: "bg-blue-500",
    },
    {
      title: "Resolution Rate",
      value: `${performanceData.resolution_rate}%`,
      icon: CheckCircle,
      progress: performanceData.resolution_rate,
      color: "bg-green-500",
    },
    {
      title: "Case Closure Rate",
      value: `${performanceData.case_closure_rate}%`,
      icon: AlertTriangle,
      progress: performanceData.case_closure_rate,
      color: "bg-orange-500",
    },
    {
      title: "Active Officers",
      value: performanceData.active_officers.toString(),
      icon: Users,
      progress: Math.min((performanceData.active_officers / 50) * 100, 100),
      color: "bg-purple-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{metric.title}</span>
                </div>
                <span className="text-sm font-bold">{metric.value}</span>
              </div>
              <Progress value={metric.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
