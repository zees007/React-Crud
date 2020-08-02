import axios from 'axios'


class StudentRegisteredService {
    getAllBooks(){
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

    getAllAchievementList(){
        return axios.get('http://localhost:8080/achievements')
    }

    createParty(permission){
        return axios.post('http://localhost:8080/permission/save', permission)
    }

}
export default new StudentRegisteredService()
