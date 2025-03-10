"use client"

import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Confetti } from "@/components/confetti"

const destinations = [
  "Maldives",
  "Egypt",
  "Bali",
  "Dubai",
  "Japan",
  "Australia",
  "Thailand",
  "Singapore",
  "Malaysia",
  "Vietnam",
  "South Korea",
  "New Zealand",
  "Italy",
  "France",
  "Spain",
  "Greece",
  "Turkey",
  "Switzerland",
  "Germany",
  "United Kingdom",
]

export default function CustomizePage() {
  const [step, setStep] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("")
  const [numDays, setNumDays] = useState("")
  const [travelingWith, setTravelingWith] = useState("")
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const filteredDestinations = destinations.filter((dest) => dest.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDestinationSelect = (destination: string) => {
    setSelectedDestination(destination)
    setStep(1)
  }

  const handleNext = () => {
    if (step === 3) {
      setShowConfetti(true)
    }
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const progressPercentage = ((step + 1) / 5) * 100

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-4xl mx-auto">
      {showConfetti && <Confetti />}

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Customize Your Trip</h1>
        <Progress value={progressPercentage} className="h-2" />
        <p className="mt-2 text-muted-foreground">Step {step + 1} of 5</p>
      </div>

      {step === 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Pick your destination</h2>
          <div className="relative">
            <Input
              className="pl-10"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredDestinations.map((destination) => (
              <Card
                key={destination}
                className={`cursor-pointer hover:border-primary transition-colors ${
                  selectedDestination === destination ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleDestinationSelect(destination)}
              >
                <CardContent className="p-4">
                  <p className="font-medium">{destination}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">How many days do you want to travel?</h2>
          <p className="text-muted-foreground">
            Selected destination: <span className="font-medium text-foreground">{selectedDestination}</span>
          </p>

          <RadioGroup value={numDays} onValueChange={setNumDays} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[3, 5, 7, 10, 14, 21].map((days) => (
              <div key={days}>
                <RadioGroupItem value={days.toString()} id={`days-${days}`} className="peer sr-only" />
                <Label
                  htmlFor={`days-${days}`}
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-xl font-semibold">{days}</span>
                  <span className="text-sm text-muted-foreground">days</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!numDays}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Who is traveling with you?</h2>
          <p className="text-muted-foreground">
            Selected destination: <span className="font-medium text-foreground">{selectedDestination}</span> •
            <span className="font-medium text-foreground"> {numDays} days</span>
          </p>

          <RadioGroup
            value={travelingWith}
            onValueChange={setTravelingWith}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {["Solo", "Couple", "Family", "Friends", "Business", "Group"].map((type) => (
              <div key={type}>
                <RadioGroupItem value={type} id={`type-${type}`} className="peer sr-only" />
                <Label
                  htmlFor={`type-${type}`}
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-lg font-medium">{type}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!travelingWith}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Configure room options</h2>
          <p className="text-muted-foreground">
            Selected destination: <span className="font-medium text-foreground">{selectedDestination}</span> •
            <span className="font-medium text-foreground"> {numDays} days</span> •
            <span className="font-medium text-foreground"> {travelingWith}</span>
          </p>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Select value={rooms.toString()} onValueChange={(value) => setRooms(Number.parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="adults">Adults</Label>
                <Select value={adults.toString()} onValueChange={(value) => setAdults(Number.parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Adults" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="children">Children</Label>
                <Select value={children.toString()} onValueChange={(value) => setChildren(Number.parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Children" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="special-requests" />
                <Label htmlFor="special-requests">I have special requests</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold">Congratulations!</h2>
          <p className="text-xl">Your dream trip to {selectedDestination} has been customized.</p>

          <div className="bg-primary/10 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-4">Trip Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-muted-foreground">Destination</p>
                <p className="font-medium">{selectedDestination}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-medium">{numDays} days</p>
              </div>
              <div>
                <p className="text-muted-foreground">Traveling With</p>
                <p className="font-medium">{travelingWith}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Rooms</p>
                <p className="font-medium">
                  {rooms} room(s), {adults} adult(s), {children} children
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Link href="/get-in-touch">
              <Button>Talk to an Expert</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}

