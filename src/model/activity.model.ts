export interface Activity {
    id?: number;
    report_period_start?: Date;
    report_period_end?: Date;
    execution_task?: string;
    result_plan?: string;
    action_plan?: string;
    output?: string;
    budget?: string;
    budget_source?: string;
    created_at?: Date;
    updated_at?: Date;
}
