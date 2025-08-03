"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, RefreshCw, Wand2, User } from "lucide-react"
import { generateUCFSIN } from "@/lib/ucfsin-generator"

interface SubscriberGeneratorProps {
  isOpen: boolean
  onClose: () => void
  onSelectSubscribers: (subscribers: any[]) => void
  schemeDetails: any
}

export function SubscriberGenerator({ isOpen, onClose, onSelectSubscribers, schemeDetails }: SubscriberGeneratorProps) {
  const [numberOfSubscribers, setNumberOfSubscribers] = useState("10")
  const [generatedSubscribers, setGeneratedSubscribers] = useState([])
  const [generating, setGenerating] = useState(false)

  const generateRandomName = () => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Jona", "Kevin", "Laura", "Mike", "Nancy"]
    return names[Math.floor(Math.random() * names.length)]
  }

  const generateRandomMobile = () => {
    return `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`
  }

  const generateRandomAddress = () => {
    const addresses = [
      "123 Main St, Anytown",
      "456 Oak Ave, Somecity",
      "789 Pine Ln, Othertown",
      "101 Elm Rd, Newville",
      "222 Maple Dr, Oldtown",
    ]
    return addresses[Math.floor(Math.random() * addresses.length)]
  }

  const generateSubscribers = async () => {
    setGenerating(true)
    setGeneratedSubscribers([])

    try {
      const num = Number.parseInt(numberOfSubscribers)
      if (num > 0 && num <= 100) {
        const newSubscribers = []
        for (let i = 0; i < num; i++) {
          const ucfsin = generateUCFSIN()
          newSubscribers.push({
            name: generateRandomName(),
            mobile: generateRandomMobile(),
            ucfsin: ucfsin,
            address: generateRandomAddress(),
            isGenerated: true,
          })
        }
        setGeneratedSubscribers(newSubscribers)
      } else {
        alert("Please enter a valid number between 1 and 100")
      }
    } catch (error) {
      console.error("Error generating subscribers:", error)
      alert("Error generating subscribers. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleSelectSubscribers = () => {
    onSelectSubscribers(generatedSubscribers)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generate Random Subscribers</DialogTitle>
          <DialogDescription>Generate a list of random subscribers for testing purposes.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numberOfSubscribers">Number of Subscribers (1-100)</Label>
            <Input
              id="numberOfSubscribers"
              type="number"
              placeholder="Enter number of subscribers to generate"
              value={numberOfSubscribers}
              onChange={(e) => setNumberOfSubscribers(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={generateSubscribers} disabled={generating}>
              {generating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Subscribers
                </>
              )}
            </Button>
          </div>

          {generatedSubscribers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Generated Subscribers</h3>
              <ul className="space-y-2">
                {generatedSubscribers.map((subscriber, index) => (
                  <li key={index} className="flex items-center justify-between p-3 rounded-md bg-gray-50">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{subscriber.name}</p>
                        <p className="text-sm text-gray-500">UCFSIN: {subscriber.ucfsin}</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-6">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSelectSubscribers} disabled={generatedSubscribers.length === 0}>
            Select Subscribers
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
