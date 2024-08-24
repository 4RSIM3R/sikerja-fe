import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm } from "react-hook-form"
import { z } from "zod"

export const ActivityForm = () => {

    const schema = z.object({
        report_period_start: z.string().min(3),
        report_period_end: z.string().min(3),
        execution_task: z.string().min(3),
        result_plan: z.string().min(3),
        action_plan: z.string().min(3),
        output: z.string().min(3),
        budget: z.number(),
        budget_source: z.string().min(3),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (values: z.infer<typeof schema>) => {

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Assignment</CardTitle>
                <CardDescription>Create a new assignment</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-full flex-col justify-center sm:max-w-md">
                        <FormField
                            control={form.control}
                            name="report_period_start"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Report Period Start</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="report_period_start" {...field} />
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
                                        <Input type="text" placeholder="report_period_end" {...field} />
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
                                        <Input type="text" placeholder="execution_task" {...field} />
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
                                        <Input type="text" placeholder="result_plan" {...field} />
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
                                        <Input type="text" placeholder="action_plan" {...field} />
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
                                        <Input type="text" placeholder="output" {...field} />   
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
                                        <Input type="text" placeholder="budget" {...field} />
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
                                        <Input type="text" placeholder="budget_source" {...field} />
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