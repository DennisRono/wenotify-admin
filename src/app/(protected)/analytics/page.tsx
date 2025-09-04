'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import {
  reduxFetchCaseAnalytics,
  reduxFetchCrimeStats,
  reduxFetchTrendAnalysis,
  reduxFetchHotspotAnalysis,
  reduxFetchPredictiveAnalysis,
  reduxFetchPerformanceAnalytics,
  reduxFetchDashboardSummary,
  reduxFetchGeographicAnalytics,
  reduxFetchTimeBasedAnalytics,
  reduxFetchComparativeAnalytics,
  reduxFetchUserEngagementAnalytics,
  reduxFetchRealTimeAnalytics,
  reduxExportAnalyticsData,
} from '@/store/actions/analytics'
import { CrimeStatsOverview } from '@/components/analytics/crime-stats-overview'
import { HotspotsMap } from '@/components/analytics/hotspots-map'
import { TimePatternsChart } from '@/components/analytics/time-patterns-chart'
import { PerformanceMetrics } from '@/components/analytics/performance-metrics'
import { PredictiveAnalysis } from '@/components/analytics/predictive-analysis'
import { ExportControls } from '@/components/analytics/export-controls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Clock,
  Brain,
  Settings,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectAnalytics } from '@/store/selectors/analytics'
import { Skeleton } from '@/components/ui/skeleton'

// Skeleton Components
const CrimeStatsOverviewSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-48" />
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </CardContent>
  </Card>
)

const PerformanceMetricsSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-56" />
    </CardHeader>
    <CardContent className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </CardContent>
  </Card>
)

const HotspotsMapSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-48" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-64 w-full" />
    </CardContent>
  </Card>
)

const TimePatternsChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-56" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-64 w-full" />
    </CardContent>
  </Card>
)

const PredictiveAnalysisSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-64" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const ExportControlsSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-48" />
    </CardHeader>
    <CardContent className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
      <Skeleton className="h-10 w-32 mt-4" />
    </CardContent>
  </Card>
)

const ChartSkeleton = () => (
  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
    <Skeleton className="h-48 w-full" />
  </div>
)

export default function AnalyticsPage() {
  const dispatch = useAppDispatch()
  const {
    crimeStatsLoading,
    trendAnalysisLoading,
    hotspotAnalysisLoading,
    predictiveAnalysisLoading,
    dashboardSummaryLoading,
    performanceAnalyticsLoading,
    geographicAnalyticsLoading,
    timeBasedAnalyticsLoading,
    comparativeAnalyticsLoading,
    caseAnalyticsLoading,
    userEngagementAnalyticsLoading,
    realTimeAnalyticsLoading,
  } = useSelector(selectAnalytics)

  useEffect(() => {
    dispatch(reduxFetchCaseAnalytics())
    dispatch(reduxFetchCrimeStats())
    dispatch(reduxFetchTrendAnalysis())
    dispatch(reduxFetchHotspotAnalysis())
    dispatch(reduxFetchPredictiveAnalysis())
    dispatch(reduxFetchPerformanceAnalytics())
    dispatch(reduxFetchDashboardSummary())
    dispatch(reduxFetchGeographicAnalytics())
    dispatch(reduxFetchTimeBasedAnalytics())
    dispatch(reduxFetchComparativeAnalytics())
    dispatch(reduxFetchUserEngagementAnalytics())
    dispatch(reduxFetchRealTimeAnalytics())
    dispatch(reduxExportAnalyticsData())
  }, [dispatch])

  // Check if any data is still loading
  const isLoading =
    crimeStatsLoading ||
    trendAnalysisLoading ||
    hotspotAnalysisLoading ||
    predictiveAnalysisLoading ||
    dashboardSummaryLoading ||
    performanceAnalyticsLoading ||
    geographicAnalyticsLoading ||
    timeBasedAnalyticsLoading ||
    comparativeAnalyticsLoading ||
    caseAnalyticsLoading ||
    userEngagementAnalyticsLoading ||
    realTimeAnalyticsLoading

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive crime analytics, trends, and predictive insights for
          informed decision making.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="max-w-min w-full bg-transparent p-0 justify-start border-b rounded-none mb-2">
          <TabsTrigger
            value="overview"
            className="mx-2 cursor-pointer rounded-none h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="mx-2 cursor-pointer rounded-none h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger
            value="hotspots"
            className="mx-2 cursor-pointer rounded-none h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <MapPin className="h-4 w-4" />
            Hotspots
          </TabsTrigger>
          <TabsTrigger
            value="patterns"
            className="mx-2 cursor-pointer rounded-none h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <Clock className="h-4 w-4" />
            Patterns
          </TabsTrigger>
          <TabsTrigger
            value="predictions"
            className="mx-2 cursor-pointer rounded-none h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <Brain className="h-4 w-4" />
            Predictions
          </TabsTrigger>
          <TabsTrigger
            value="export"
            className="mx-2 cursor-pointer rounded-none h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <Settings className="h-4 w-4" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              <CrimeStatsOverviewSkeleton />
              <PerformanceMetricsSkeleton />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <CrimeStatsOverview />
              <PerformanceMetrics />
            </div>
          )}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {isLoading ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-4" />
                  <ChartSkeleton />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crime Trends Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Analyze crime trends over time to identify patterns and
                    seasonal variations.
                  </p>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-muted-foreground">
                      Advanced trend analysis charts would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="hotspots" className="space-y-6">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              <HotspotsMapSkeleton />
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-4" />
                  <ChartSkeleton />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <HotspotsMap />
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Interactive map showing crime distribution across different
                    areas.
                  </p>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-muted-foreground">
                      Interactive map would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          {isLoading ? (
            <div className="grid gap-6">
              <TimePatternsChartSkeleton />
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-4" />
                  <ChartSkeleton />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6">
              <TimePatternsChart />
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Identify seasonal and cyclical patterns in crime data.
                  </p>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-muted-foreground">
                      Seasonal pattern analysis would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {isLoading ? (
            <div className="grid gap-6">
              <PredictiveAnalysisSkeleton />
            </div>
          ) : (
            <div className="grid gap-6">
              <PredictiveAnalysis />
            </div>
          )}
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              <ExportControlsSkeleton />
              <Card className="md:col-span-2">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Skeleton className="h-5 w-48 mb-2" />
                      <ul className="space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <li key={i}>
                            <Skeleton className="h-4 w-full" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Skeleton className="h-5 w-40 mb-2" />
                      <ul className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <li key={i}>
                            <Skeleton className="h-4 w-full" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <ExportControls />
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">
                        Available Export Formats
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                          • <strong>PDF Report:</strong> Comprehensive formatted
                          report with charts and analysis
                        </li>
                        <li>
                          • <strong>CSV Data:</strong> Raw data for further
                          analysis in spreadsheet applications
                        </li>
                        <li>
                          • <strong>Excel Spreadsheet:</strong> Formatted data
                          with multiple sheets and charts
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Data Included</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                          • Crime statistics by type, location, and time period
                        </li>
                        <li>• Trend analysis and forecasting data</li>
                        <li>• Hotspot identification and risk assessment</li>
                        <li>• Performance metrics and KPIs</li>
                        <li>• Predictive analysis results</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
