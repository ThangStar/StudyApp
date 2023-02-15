import axios from "axios";
const BaseURL = "http://172.16.26.51:3000"
const Request =
     axios.create({
          baseURL: BaseURL
     })

export default Request