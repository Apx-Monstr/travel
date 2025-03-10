'use client';

import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DestinationCard } from "@/components/destination-card";
import axios from "axios";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    
    // Fetch banners using .then()
    axios.get("https://json-data-1wm2.onrender.com/banners")
      .then(response => {
        // Extract the banners array from the response
        const bannersData = response.data.banners || [];
        setBanners(bannersData);
      })
      .catch(error => {
        console.error("Error fetching banners:", error);
        setError("Failed to load banners. Please try again later.");
      });
    
    // Fetch featured destinations using .then()
    axios.get("https://json-data-1wm2.onrender.com/featured-destination")
      .then(response => {
        // Extract the destination array from the response
        const destinationsData = response.data.destination || [];
        setFeaturedDestinations(destinationsData);
      })
      .catch(error => {
        console.error("Error fetching destinations:", error);
        setError("Failed to load destinations. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading amazing destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section with Carousel */}
      <section className="relative w-full h-[600px]">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {banners.length > 0 ? (
              banners.map((banner, index) => (
                <CarouselItem key={index} className="h-[600px]">
                  <div className="relative w-full h-full">
                    <img
                      src={banner.img || "/placeholder.svg"}
                      alt={banner.alt || "Travel banner"}
                      style={{backgroundPosition:'center'}}
                      className="object-cover object-center w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Discover Amazing Places</h1>
                      <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
                        Explore the world`s most beautiful destinations
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="h-[600px]">
                <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center p-8">
                    <h2 className="text-xl text-gray-700">No banner images available</h2>
                  </div>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          {banners.length > 1 && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>

        {/* Search Bar */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <Link href="/customize" className="w-full">
            <div className="relative w-full">
              <Input
                className="w-full h-14 pl-12 pr-4 rounded-full text-lg bg-white/90 backdrop-blur-sm border-2 border-primary cursor-pointer"
                placeholder="Where do you want to go?"
                readOnly
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.length > 0 ? (
            featuredDestinations.map((destination, index) => (
              <DestinationCard 
                key={index} 
                destination={destination} 
              />
            ))
          ) : (
            <div className="col-span-full text-center p-8">
              <p className="text-xl text-gray-500">No featured destinations available</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}