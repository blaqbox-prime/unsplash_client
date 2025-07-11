import { Rings } from "react-loader-spinner"

function Loading() {
  return (
    <Rings
  visible={true}
  height="26"
  width="26"
  color="#ffff"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  )
}

export default Loading
