"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { off } from "process";

interface SalonFormProps {
  initialValues?: any;
  formType?: "add" | "edit";
}

const offerStatuses = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

function SalonSpaForm({ initialValues, formType }: SalonFormProps) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip code is required"),
    working_time: z.array(z.string().nonempty()),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
    break_start_time: z.string().min(1, "Break start time is required"),
    break_end_time: z.string().min(1, "Break end time is required"),
    minimum_service_price: z.number(),
    maximum_service_price: z.number(),
    offer_status: z.string().nonempty(),
    slot_duration: z.number(),
    max_bookings_per_slot: z.number(),
    location_name: z.string().min(1, "Location name is required"),
    latitude: z.string().min(1, "Latitude is required"),
    longitude: z.string().min(1, "Longitude is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      address: initialValues?.address || "",
      city: initialValues?.city || "",
      state: initialValues?.state || "",
      zip: initialValues?.zip || "",
      working_time: initialValues?.working_time || [],
      start_time: initialValues?.start_time || "",
      end_time: initialValues?.end_time || "",
      break_start_time: initialValues?.break_start_time || "",
      break_end_time: initialValues?.break_end_time || "",
      minimum_service_price: initialValues?.minimum_service_price || 0,
      maximum_service_price: initialValues?.maximum_service_price || 0,
      offer_status: initialValues?.offer_status || "active",
      slot_duration: initialValues?.slot_duration || 0,
      max_bookings_per_slot: initialValues?.max_bookings_per_slot || 0,
      location_name: initialValues?.location_name || "",
      latitude: initialValues?.latitude || "",
      longitude: initialValues?.longitude || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="mt-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display Email.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Description" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display Email.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display Email.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 lg: grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter City" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display Email.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter State" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display Email.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Zip" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display Email.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minimum_service_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Service Price </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Minimum Service Price"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue(
                          "minimum_service_price",
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display Email.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maximum_service_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Service Price </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Maximum Service Price"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue(
                          "maximum_service_price",
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display Email.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slot_duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slot Duration</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Slot Duration"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue(
                          "slot_duration",
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display Email.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max_bookings_per_slot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Bookings Per Slot</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Max Bookings Per Slot"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue(
                          "max_bookings_per_slot",
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display Email.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offer_status"
              render={({ field }) => (
                <FormItem
                 className="w-full"
                >
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Offer Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {offerStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
export default SalonSpaForm;
