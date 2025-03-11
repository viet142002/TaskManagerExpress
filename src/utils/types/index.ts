interface ISingleResponse {
    isList: false
    data: unknown
    status: number
    message: string
}

interface IListResponse {
    isList: true
    data: Array<unknown>
    status: number
    message: string
    pagination: {
        page: number
        limit: number
        totalPages: number
    }
}

export type ResponseFormatted = IListResponse | ISingleResponse

export interface IUserToken {
    id: number
    name: string
    email: string
}
