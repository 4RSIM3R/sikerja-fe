import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const SettingForm = () => {

    const schema = z.object({
        application_name: z.string().min(3),
        application_description: z.string().min(3),
        application_version: z.string().min(3),
        start_working_hour: z.string().min(3),
        grace_period_minutes: z.number(),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (values: z.infer<typeof schema>) => {

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Setting</CardTitle>
                <CardDescription>Web and mobile application settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-full flex-col justify-center sm:max-w-md">
                        <FormField
                            control={form.control}
                            name="application_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="application_name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="application_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Description</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="application_description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="application_version"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Version</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="application_version" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start_working_hour"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Working Hour</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="start_working_hour" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="grace_period_minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grace Period Minutes</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="grace_period_minutes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-4" type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}