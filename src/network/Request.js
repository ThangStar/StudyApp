import axios from "axios";
export const BaseURL = "http://192.168.167.185:3000"
const Request =
     axios.create({
          baseURL: BaseURL
     })

export default Request