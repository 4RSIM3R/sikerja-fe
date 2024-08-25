export interface ErrorResponse {
    message: string;
}

export interface ApiResponse<T> {
    message: string;
    data: {
        items: T[];
        prev_page: number | null;
        current_page: number;
        next_page: number | null;
    };
}