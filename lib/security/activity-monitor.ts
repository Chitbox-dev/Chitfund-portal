interface SecurityEvent {
  timestamp: string
  ip: string
  userId?: string
  action: string
  path: string
  severity: "low" | "medium" | "high" | "critical"
  details?: any
}

class ActivityMonitor {
  private events: SecurityEvent[] = []
  private maxEvents = 1000

  log(event: Omit<SecurityEvent, "timestamp">) {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    }

    this.events.push(fullEvent)

    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    // Log critical events immediately
    if (event.severity === "critical" || event.severity === "high") {
      console.error("[SECURITY ALERT]", fullEvent)
      // In production, send to monitoring service (Sentry, DataDog, etc.)
    }
  }

  getEvents(filter?: { severity?: string; ip?: string; userId?: string }): SecurityEvent[] {
    if (!filter) return this.events

    return this.events.filter((event) => {
      if (filter.severity && event.severity !== filter.severity) return false
      if (filter.ip && event.ip !== filter.ip) return false
      if (filter.userId && event.userId !== filter.userId) return false
      return true
    })
  }

  clearOldEvents(olderThanHours = 24) {
    const cutoff = Date.now() - olderThanHours * 60 * 60 * 1000
    this.events = this.events.filter((event) => new Date(event.timestamp).getTime() > cutoff)
  }
}

export const activityMonitor = new ActivityMonitor()
