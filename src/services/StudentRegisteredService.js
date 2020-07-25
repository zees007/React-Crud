import axios from 'axios'


class StudentRegisteredService {
    getAllBooks(name){
        return axios.get('http://localhost:8080/registrations')
    }

    createStudentRegistration(student){
        return axios.post('http://localhost:8080/registration/save', student)
    }

    editStudentRegistration(x){
        return axios.post('http://localhost:8080/registration/save', x)
    }

    deleteStudentRegistration(id){
        return axios.post('http://localhost:8080/registration/delete/' + id)
    }

    updateStudentRegistration(id){
        return axios.get('http://localhost:8080/getOne/registration/'+ id)
    }

    uploadFile(formData: FormData){
        return axios.post('http://localhost:8080/files/upload', formData)
    }

    createAchievement(achievement){
        return axios.post('http://localhost:8080/achievement/save', achievement);
    }

}
export default new StudentRegisteredService()
