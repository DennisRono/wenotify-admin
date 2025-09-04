'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useAppSelector } from '@/store/hooks'
import { useSelector } from 'react-redux'
import { selectAnalytics } from '@/store/selectors/analytics'

export function TimePatternsChart() {
  const { timeBasedAnalytics: timePatterns } = useSelector(selectAnalytics)

  // Mock data if timePatterns is empty
  const chartData =
    Array.isArray(timePatterns) && timePatterns.length > 0
      ? timePatterns
      : [
          { hour: '00:00', incidents: 2 },
          { hour: '02:00', incidents: 1 },
          { hour: '04:00', incidents: 1 },
          { hour: '06:00', incidents: 3 },
          { hour: '08:00', incidents: 8 },
          { hour: '10:00', incidents: 12 },
          { hour: '12:00', incidents: 15 },
          { hour: '14:00', incidents: 18 },
          { hour: '16:00', incidents: 22 },
          { hour: '18:00', incidents: 25 },
          { hour: '20:00', incidents: 19 },
          { hour: '22:00', incidents: 8 },
        ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crime Patterns by Time of Day</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="incidents"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-2))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
