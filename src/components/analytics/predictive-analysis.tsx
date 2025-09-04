"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { useSelector } from "react-redux"
import { selectAnalytics } from "@/store/selectors/analytics"

export function PredictiveAnalysis() {
  const { predictiveAnalysis: predictions } = useSelector(selectAnalytics)

  // Mock data if predictions is empty
  const predictionsData = Array.isArray(predictions) &&
    predictions.length > 0
      ? predictions
      : [
          {
            prediction_type: "Crime Rate Trend",
            prediction: "15% increase expected next month",
            confidence: 85,
            risk_level: "MEDIUM",
            trend: "up",
          },
          {
            prediction_type: "Hotspot Emergence",
            prediction: "New hotspot likely in Kasarani area",
            confidence: 72,
            risk_level: "HIGH",
            trend: "up",
          },
          {
            prediction_type: "Resource Allocation",
            prediction: "Additional 3 officers needed in CBD",
            confidence: 91,
            risk_level: "LOW",
            trend: "neutral",
          },
          {
            prediction_type: "Seasonal Pattern",
            prediction: "Theft incidents may decrease by 8%",
            confidence: 68,
            risk_level: "LOW",
            trend: "down",
          },
        ]

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-orange-100 text-orange-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictionsData.map((prediction, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  {getTrendIcon(prediction.trend)}
                  {prediction.prediction_type}
                </h4>
                <Badge className={getRiskColor(prediction.risk_level)} variant="secondary">
                  {prediction.risk_level}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{prediction.prediction}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence: {prediction.confidence}%</span>
                <div className="w-20 bg-gray-200 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${prediction.confidence}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
