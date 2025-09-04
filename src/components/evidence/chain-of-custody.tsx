"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, FileText } from "lucide-react"
import { format } from "date-fns"
import type { ChainOfCustodyEntry } from "@/types/evidence"

interface ChainOfCustodyProps {
  entries: ChainOfCustodyEntry[]
}

export function ChainOfCustody({ entries }: ChainOfCustodyProps) {
  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "created":
        return "bg-green-100 text-green-800"
      case "accessed":
        return "bg-blue-100 text-blue-800"
      case "modified":
        return "bg-orange-100 text-orange-800"
      case "transferred":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Chain of Custody
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No custody records available</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getActionColor(entry.action)} variant="secondary">
                      {entry.action}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{format(new Date(entry.timestamp), "PPp")}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{entry.user_name}</span>
                    <span className="text-sm text-muted-foreground">({entry.user_role})</span>
                  </div>
                  {entry.notes && <p className="text-sm text-muted-foreground">{entry.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
