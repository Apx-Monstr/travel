"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Check, Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contactNumber: z.string().min(10, { message: "Contact number must be at least 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  budget: z.string({ required_error: "Please select a budget range." }),
})

type FormValues = z.infer<typeof formSchema>

export default function GetInTouchPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      email: "",
      budget: "",
    },
  })

  function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fill out the form below and our travel experts will get back to you with personalized recommendations for your
          dream vacation.
        </p>
      </div>

      {isSubmitted ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center">Thank You!</CardTitle>
            <CardDescription className="text-center">
              We`ve received your inquiry and will contact you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => {
                setIsSubmitted(false)
                form.reset()
              }}
              variant="outline"
              className="mt-4"
            >
              Submit Another Inquiry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Please provide your details so we can help you plan your trip.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="50000-100000">₹50,000 - 1 Lakh</SelectItem>
                          <SelectItem value="100000-200000">1 Lakh - 2 Lakhs</SelectItem>
                          <SelectItem value="200000-300000">2 Lakhs - 3 Lakhs</SelectItem>
                          <SelectItem value="300000+">3 Lakhs+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

