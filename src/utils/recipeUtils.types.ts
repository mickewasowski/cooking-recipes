export type ItemFromDB = {
    _id: string,
    name: string,
    description: string,
    image: string,
    type: string,
    owner: string,
    additionalData: Map<string, any>,
    createdAt: Date,
    updatedAt: Date,
}
