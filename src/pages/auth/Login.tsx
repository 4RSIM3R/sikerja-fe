import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { bg_login } from "@/data/ui"
import { http } from "@/lib/http"
import { ErrorResponse } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const Login = () => {

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    const { toast } = useToast()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof schema>) => {
            return await http(false).post('/auth/login', values);
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error: AxiosError) => {
            toast({
                title: 'Error',
                description: (
                    <>
                        {(error.response?.data as ErrorResponse)?.message ?? 'Something went wrong'}
                    </>
                ),
                variant: 'destructive'
            })
        }
    })

    const onSubmit = async (values: z.infer<typeof schema>) => {
        mutation.mutate(values)
    }

    return (
        <>
            <Toaster />
            <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
                <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>

                    <img className='absolute inset-0 h-screen object-cover w-full' src={bg_login} alt="" />
                    <div className='absolute inset-0 h-screen w-full bg-zinc-900 bg-opacity-60' />
                    <div className='relative z-20 flex items-center text-lg font-medium'>
                        SIKERJA
                    </div>

                    <div className='relative z-20 mt-auto'>
                        <blockquote className='space-y-2'>
                            <p className='text-lg'>
                                Insun medal
                            </p>
                            <footer className='text-sm'>DINKES SUMEDANG</footer>
                        </blockquote>
                    </div>
                </div>
                <div className='lg:p-8'>
                    <Form {...form}  >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-full flex-col justify-center sm:max-w-md">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="my-4" >
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mt-4" type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}