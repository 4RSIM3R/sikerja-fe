import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { http } from "@/lib/http"
import { ErrorResponse } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

export const AnnouncementForm = () => {

    const schema = z.object({
        title: z.string().min(3),
        content: z.string().min(3),
        thumbnail: z.instanceof(FileList)
            .refine(files => files?.length > 0, { message: "Thumbnail is required" })
            .refine(files => files[0]?.size <= 5 * 1024 * 1024, { message: "File size must be less than 2MB" }),
    })

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',

    });

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof schema>) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('thumbnail', values.thumbnail[0]);

            return await http(true).post('/announcement', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: (response: AxiosResponse) => {
            navigate('/backoffice/announcements')
        },
        onError: (error: AxiosError) => {
            toast({
                title: 'Error',
                description: (
                    <>
                        {(error.response?.data as ErrorResponse)?.message ?? error}
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
        <Card>
            <CardHeader>
                <CardTitle>Create Assignment</CardTitle>
                <CardDescription>Create a new assignment</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4 justify-center">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            id="thumbnail"
                                            accept="image/*"
                                            onChange={(e) => field.onChange(e.target.files)} // Handle file input change
                                        />
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