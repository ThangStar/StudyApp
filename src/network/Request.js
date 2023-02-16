import axios from "axios";
const BaseURL = "http://192.168.1.12:3000"
const Request =
     axios.create({
          baseURL: BaseURL
     })

export default Request