import * as Yup from 'yup'

export const initialValues = () => {
    return {
        title: "",
        comment: "",
        ranking: 3,
    }
}

export const validationSchema = () => {
    return Yup.object({
        title: Yup.string().required("Title is required"),
        comment: Yup.string().required("Comment is required"),
        ranking: Yup.number().required("Ranking is required"),
    })
}