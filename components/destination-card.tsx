import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Link from "next/link"

interface DestinationCardProps {
  destination: {
    id: string
    title:string
    handle: string
    img: string
    description: string
    price: number
  }
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-60 w-full overflow-hidden px-4">
        <img src={destination.img || "/placeholder.svg"} alt={destination.title} className="object-cover overflow-hidden rounded" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{destination.title}</h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{destination.title}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* <p className="text-muted-foreground line-clamp-3">{destination.description}</p>
        <p className="mt-4 font-semibold">Starting from ₹{destination.price}</p> */}
      </CardContent>
      <CardFooter>
        <Link href={`/destination/${destination.handle}`} className="w-full">
          <Button className="w-full">Explore</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

