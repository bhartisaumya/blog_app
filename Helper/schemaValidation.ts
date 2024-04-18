import joi from "joi";

export const registerSchema = joi.object({
    fullName: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
})


export const loginSchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(5),
})

export const noteSchema = joi.object({
    userId: joi.string(),
    title: joi.string().required(),
    content: joi.string().required()
})

export const bookingSchema = joi.object({
    propertyNumber: joi.string().required(),
    userId: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    addon: joi.string(),
    totalBill: joi.number().required()
})

export const commentSchema = joi.object({
    comment: joi.string().required(),
    noteId: joi.string().required()
})