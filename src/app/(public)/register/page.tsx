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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import toast from "react-hot-toast";
import { registerNewUser } from "@/actions/users";
import {useRouter} from "next/navigation";

function RegisterPage() {

   const [loading, setLoading] = React.useState(false);
   const router = useRouter();


  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    role  : z.enum(["user", "salon-spa-owner"])
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name : "",
      email: "",
      password: "",
      role: "user",
      
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      setLoading(true);

      const response = await registerNewUser(values);
      if (response.success) {
        toast.success('Account created successfully!');
        router.push('/login');
        form.reset();
      } else {
        toast.error(response.message);
      }

    } catch (error : any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="bg-white p-5 rounded-sm w-[500px]">

        <h1 className="text-2xl font-bold text-center mb-5">Register Your Account</h1>
        <hr 
        className="border-gray-300 my-7 border-1"
        />  
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                    type="password"
                    placeholder="Enter Password" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display Password.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Role...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-10"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="user" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          User
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="salon-spa-owner" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Salon/Spa Owner
                        </FormLabel>
                      </FormItem>
                      
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                have an account 
                <Link href="/login" className="text-blue-500 underline" >Login</Link>
              </div>
               <Button type="submit"
               disabled={loading}
               
               >Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default RegisterPage;
