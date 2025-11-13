import axios from "axios";

// then返回一个解析res.data的Promise
const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default fetcher;