'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, TrendingUp } from 'lucide-react'
import { useAppSelector } from '@/store/hooks'
import { useSelector } from 'react-redux'
import { selectAnalytics } from '@/store/selectors/analytics'

export function HotspotsMap() {
  const { hotspotAnalysis: hotspots } = useSelector(selectAnalytics)

  // Mock data if hotspots is empty
  const hotspotsData =
    Array.isArray(hotspots) && hotspots.length > 0
      ? hotspots
      : [
          {
            location: 'Downtown Nairobi',
            incident_count: 23,
            risk_level: 'HIGH',
            coordinates: [-1.2921, 36.8219],
          },
          {
            location: 'Westlands',
            incident_count: 18,
            risk_level: 'MEDIUM',
            coordinates: [-1.2676, 36.8108],
          },
          {
            location: 'Eastleigh',
            incident_count: 15,
            risk_level: 'MEDIUM',
            coordinates: [-1.2833, 36.85],
          },
          {
            location: 'Karen',
            incident_count: 8,
            risk_level: 'LOW',
            coordinates: [-1.3197, 36.7085],
          },
          {
            location: 'Kibera',
            incident_count: 31,
            risk_level: 'HIGH',
            coordinates: [-1.3133, 36.7833],
          },
        ]

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'bg-red-100 text-red-800'
      case 'MEDIUM':
        return 'bg-orange-100 text-orange-800'
      case 'LOW':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Crime Hotspots
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hotspotsData.map((hotspot, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium">{hotspot.location}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {hotspot.incident_count} incidents
                </p>
              </div>
              <Badge
                className={getRiskColor(hotspot.risk_level)}
                variant="secondary"
              >
                {hotspot.risk_level}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
