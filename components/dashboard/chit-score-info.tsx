"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { TrendingUp, AlertTriangle, CheckCircle, Info, HelpCircle, ExternalLink } from "lucide-react"

export default function ChitScoreInfo() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <Card className="shadow-lg border-none overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-chitfund-blue-950 to-purple-600 w-full"></div>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-chitfund-text-dark">
            <TrendingUp className="h-5 w-5 text-chitfund-blue-950" />
            Your Chit Score
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(!showInfo)}>
            <HelpCircle className="h-4 w-4 text-chitfund-blue-950" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {showInfo ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-chitfund-blue-950 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" /> What is Chit Score?
              </h3>
              <p className="text-chitfund-text-light text-sm">
                Chit Score is a numerical representation of your creditworthiness in the chit fund ecosystem. It's
                linked to your UCFIN and helps determine your eligibility for premium chit fund schemes.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-chitfund-text-dark">Factors that affect your Chit Score:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-chitfund-text-light">Timely payment of monthly installments</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-chitfund-text-light">Length of chit fund participation history</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-chitfund-text-light">Diversity of chit fund schemes</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-chitfund-text-light">Responsible bidding behavior</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <span className="text-chitfund-text-light">Missed payments can significantly lower your score</span>
                </li>
              </ul>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full border-chitfund-blue-950 text-chitfund-blue-950"
              onClick={() => setShowInfo(false)}
            >
              Back to Score
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-chitfund-text-light">Your current score</p>
                <h3 className="text-3xl font-bold text-chitfund-blue-950">750</h3>
              </div>
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-chitfund-blue-950 flex items-center justify-center text-white font-bold">
                  B+
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-chitfund-text-light">Poor</span>
                <span className="text-chitfund-text-light">Excellent</span>
              </div>
              <Progress value={75} className="h-2 bg-gray-200" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>300</span>
                <span>900</span>
              </div>
            </div>

            <Tabs defaultValue="factors">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger
                  value="factors"
                  className="data-[state=active]:bg-white data-[state=active]:text-chitfund-blue-950"
                >
                  Score Factors
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-white data-[state=active]:text-chitfund-blue-950"
                >
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="factors" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-chitfund-text-dark">Payment History</p>
                    <span className="text-green-600 text-sm font-medium">Excellent</span>
                  </div>
                  <Progress value={95} className="h-1.5 bg-gray-200" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-chitfund-text-dark">Participation Length</p>
                    <span className="text-amber-600 text-sm font-medium">Fair</span>
                  </div>
                  <Progress value={60} className="h-1.5 bg-gray-200" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-chitfund-text-dark">Scheme Diversity</p>
                    <span className="text-chitfund-blue-950 text-sm font-medium">Good</span>
                  </div>
                  <Progress value={75} className="h-1.5 bg-gray-200" />
                </div>
              </TabsContent>
              <TabsContent value="history" className="pt-4">
                <div className="space-y-3 text-sm">
                  <p className="text-chitfund-text-light">Your score history over time:</p>
                  <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Chart will appear after 3 months of activity</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              variant="outline"
              size="sm"
              className="w-full border-chitfund-blue-950 text-chitfund-blue-950"
              asChild
            >
              <a href="#" className="flex items-center justify-center gap-1">
                View Detailed Report <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
