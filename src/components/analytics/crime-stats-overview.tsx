'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useAppSelector } from '@/store/hooks'
import { useSelector } from 'react-redux'
import { selectAnalytics } from '@/store/selectors/analytics'

export function CrimeStatsOverview() {
  const { crimeStats } = useSelector(selectAnalytics)

  // Mock data if crimeStats is empty
  const chartData =
    Array.isArray(crimeStats) && crimeStats.length > 0
      ? crimeStats
      : [
          { crime_type: 'Theft', count: 45, percentage: 35.2 },
          { crime_type: 'Assault', count: 32, percentage: 25.0 },
          { crime_type: 'Burglary', count: 28, percentage: 21.9 },
          { crime_type: 'Vandalism', count: 15, percentage: 11.7 },
          { crime_type: 'Fraud', count: 8, percentage: 6.2 },
        ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crime Statistics by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crime_type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
