import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { http } from "@/lib/http"
import { ErrorResponse } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

export const ActivityForm = () => {

    const schema = z.object({
        report_period_start: z.string().min(3),
        report_period_end: z.string().min(3),
        execution_task: z.string().min(3),
        result_plan: z.string().min(3),
        action_plan: z.string().min(3),
        output: z.string().min(3),
        budget: z.any().optional(),
        budget_source: z.string().optional(),
    })

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof schema>) => {
            return await http(true).post('/activity', values);
        },
        onSuccess: (response: AxiosResponse) => {
            navigate('/backoffice/activity')
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex w-full flex-col justify-center">
                        <FormField
                            control={form.control}
                            name="report_period_start"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Report Period Start</FormLabel>
                                    <FormControl>
                                        <Input type="date"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="report_period_end"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Report Period End</FormLabel>
                                    <FormControl>
                                        <Input type="date"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="execution_task"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Execution Task</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="result_plan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Result Plan</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="action_plan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Action Plan</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="output"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Output</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
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
                                    <FormControl>
                                        <Input type="number" inputMode="numeric" {...field} min={0} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="budget_source"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Budget Source</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
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