import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Plane, Ship, Wine, FileText, Coffee, Utensils, Car, Umbrella, Phone, Star, Map, Bath, Users } from "lucide-react"
import Link from "next/link"
import axios from "axios"

async function getDestinationData(handle: string) {
  try {
    const response = await axios.get(`https://json-data-1wm2.onrender.com/destination/${handle}`)
    return response.data
  } catch (error) {
    console.error("Error fetching destination data:", error)
    return { trips: [] }
  }
}

const amenityIcons: Record<string, React.ReactNode> = {
  "4-star hotels": <Star className="h-4 w-4" />,
  "luxury accommodation": <Star className="h-4 w-4" />,
  "hot air balloon ride": <Umbrella className="h-4 w-4" />,
  "traditional hammam experience": <Bath className="h-4 w-4" />,
  "guided tours": <Map className="h-4 w-4" />,
  "daily breakfast": <Coffee className="h-4 w-4" />,
  "bosphorus cruise": <Umbrella className="h-4 w-4" />,
  "cooking class": <Utensils className="h-4 w-4" />,
  "all transfers": <Car className="h-4 w-4" />,
  "most meals included": <Utensils className="h-4 w-4" />,
  "tented camp accommodation": <MapPin className="h-4 w-4" />,
  "game drives": <Users className="h-4 w-4" />,
  "masai village visit": <Map className="h-4 w-4" />,
  "all meals": <Utensils className="h-4 w-4" />,
  "park fees": <Star className="h-4 w-4" />,
  "mixed accommodation": <Star className="h-4 w-4" />,
  "safari experience": <Map className="h-4 w-4" />,
  "beach resort stay": <Umbrella className="h-4 w-4" />,
  "internal flights": <Plane className="h-4 w-4" />,
  "full board during safari": <Utensils className="h-4 w-4" />,
  "5-star hotel accommodation": <Star className="h-4 w-4" />,
  "nile cruise": <Ship className="h-4 w-4" />,
  "private guided tours": <Users className="h-4 w-4" />,
  "airport transfers": <Car className="h-4 w-4" />,
  "desert safari": <MapPin className="h-4 w-4" />,
  "all meals included": <Utensils className="h-4 w-4" />,
  "professional egyptologist guide": <Users className="h-4 w-4" />,
  "traditional hotel stays": <Star className="h-4 w-4" />,
  "tiger's nest hike": <MapPin className="h-4 w-4" />,
  "cultural shows": <Users className="h-4 w-4" />,
  "visa arrangement": <FileText className="h-4 w-4" />,
  "luxury hotels": <Star className="h-4 w-4" />,
  "festival attendance": <Users className="h-4 w-4" />,
  "mountain hiking": <MapPin className="h-4 w-4" />,
  "private guide": <Users className="h-4 w-4" />,
  "all inclusive": <Utensils className="h-4 w-4" />,
  "lodge accommodation": <Star className="h-4 w-4" />,
  "wine tasting": <Wine className="h-4 w-4" />,
  "local guides": <Users className="h-4 w-4" />,
  "private safari vehicle": <Car className="h-4 w-4" />,
  "helicopter tour": <Plane className="h-4 w-4" />,
  "cultural experiences": <Users className="h-4 w-4" />,
}



export default async function DestinationPage({ params }: { params: { handle: string } }) {
  const { handle } = params
  const destinationData = await getDestinationData(handle)

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 capitalize">{handle} Trips</h1>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-5 w-5 mr-2" />
          <p className="text-lg capitalize">{handle}</p>
        </div>
      </div>

      {!destinationData.trips || destinationData.trips.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No trips available for this destination</h2>
          <p className="text-muted-foreground mb-8">Please check back later or explore other destinations</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationData.trips.map((trip: any, index: number) => {
            
            return (
              <Card key={index} className="overflow-hidden h-full flex flex-col">
                {/* <div className="relative h-48 w-full">
                  <Image
                    src={trip.img || placeholderImg}
                    alt={trip["trip-name"] || "Trip"}
                    fill
                    className="object-cover"
                  />
                </div> */}
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{trip["trip-name"]}</h3>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{trip.duration}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {trip.description || `Experience the beauty and culture of ${handle} with our ${trip["trip-name"]}.`}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {trip.amenities && trip.amenities.map((amenity: string) => (
                        <div key={amenity} className="flex items-center bg-muted px-2 py-1 rounded-full text-xs">
                          {amenityIcons[amenity.toLowerCase()] || null}
                          <span className="ml-1 capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <p className="text-lg font-bold">₹{trip.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Fixed "Talk to an Expert" button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-10">
        <div className="max-w-7xl mx-auto">
          <Link href="/get-in-touch">
            <Button className="w-full sm:w-auto">
              <Phone className="mr-2 h-4 w-4" /> Talk to an Expert
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}