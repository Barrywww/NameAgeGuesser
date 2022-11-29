import axios, { AxiosResponse } from "axios"
import { ApiResponse } from "@model"

const BASE_URL = "https://api.agify.io/"

export const getAgeByName = async (name: string): Promise<number> => {
    const response: AxiosResponse<ApiResponse> = await axios.get(BASE_URL, {
        params: {
            name: name
        }
    })
    return response.data.age
}
