import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { file_required, file_size, file_type } from "@/lib/form";
import { http } from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, useForm } from "react-hook-form";
import { z } from "zod"

export const AssignmentForm = () => {

    const schema = z.object({
        title: z.string().min(3),
        content: z.string().min(3),
        thumbnail: z.any()
            .superRefine(file_required)
            .superRefine(file_size(2))
            .superRefine(file_type('image/*'))
    })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof schema>) => {
            return await http(true).post('/announcements', values);
        },
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (values: z.infer<typeof schema>) => {
        mutation.mutate(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Assignment</CardTitle>
                <CardDescription>Create a new assignment letter</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-full flex-col justify-center sm:max-w-md">
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
                                        <Input type="text" placeholder="content" {...field} />
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
                                        <Input type="file" accept="image/*" {...field} />
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