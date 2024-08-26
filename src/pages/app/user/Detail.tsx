import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { http } from "@/lib/http";
import { useParams } from "react-router-dom"

export const UserDetail = () => {

    const { id } = useParams()

    const fetchItems = async (page: number) => {
        const axiosInstance = http(true);
        const response = await axiosInstance.get(`user/${id}`);
        return response.data;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Attendance</CardTitle>
                <CardDescription>detail attendance</CardDescription>
            </CardHeader>
            <CardContent>
                {id}
            </CardContent>
        </Card>
    )
}