import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { http } from "@/lib/http"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const SettingForm = () => {

    const fetchSetting = async () => {
        const axiosInstance = http(true);
        const response = await axiosInstance.get('setting');
        return response.data;
    };

    const schema = z.object({
        application_name: z.string().min(3),
        application_description: z.string().min(3),
        application_version: z.string().min(3),
        start_working_hour: z.string().min(3),
        grace_period_minutes: z.string(),
        chief_name: z.string().min(3),
        chief_nip: z.string().min(3),
        latitude: z.string(),
        longitude: z.string(),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof schema>) => {
            const axiosInstance = http(true);
            const response = await axiosInstance.post('setting', values);
            return response.data;
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        await mutation.mutateAsync(values);
    }

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['setting'],
        queryFn: () => fetchSetting(),
    });

    useEffect(() => {
        const payload = data[0];
        form.setValue('application_name', payload?.application_name);
        form.setValue('application_description', payload?.application_description);
        form.setValue('application_version', payload?.application_version);
        form.setValue('start_working_hour', payload?.start_working_hour);
        form.setValue('grace_period_minutes', payload?.grace_period_minutes);
        form.setValue('chief_name', payload?.chief_name);
        form.setValue('chief_nip', payload?.chief_nip);
        form.setValue('latitude', payload?.latitude);
        form.setValue('longitude', payload?.longitude);
    }, [isSuccess, data]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data...</p>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Setting</CardTitle>
                <CardDescription>Web and mobile application settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-full flex-col justify-center space-y-4">
                        <FormField
                            control={form.control}
                            name="application_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Name</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
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
                                        <Input type="text"  {...field} />
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
                                        <Input type="text" {...field} />
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
                                    <FormControl className="w-full relative" >
                                        <Input type="time" {...field} className="w-full" />
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
                                        <Input type="number" inputMode="numeric" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="chief_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chief Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="chief_nip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chief NIP</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input type="number" inputMode="numeric" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input type="number" inputMode="numeric" {...field} />
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