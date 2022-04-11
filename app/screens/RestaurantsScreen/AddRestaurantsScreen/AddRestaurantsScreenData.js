import * as Yup from 'yup'

export const initialValues = () => {
    return {
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        location: null,
        images: []
    }
}

export const validationSchema = () => {
    return Yup.object({
        name: Yup.string().required('Should be complete'),
        address: Yup.string().required('Should be complete'),
        phone: Yup.number().required('Should be complete'),
        email: Yup.string().email('It is not a valid Email').required('Should be complete'),
        description: Yup.string().required('Should be complete'),
        location: Yup.object().required('Location is required'),
        images: Yup.array().min(1).required('Image is required'),
    })
}