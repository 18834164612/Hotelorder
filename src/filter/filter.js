let filter ={
    capitalize(value,position) {
      return value.substring(0,position).toUpperCase()+value.substring(1)
    },
    formateTime(value) {
      let data = new Date(value*1000)
      let time = [data.getFullYear(),data.getMonth()+1,data.getDate()].join('/')
      return time
    }
}
export default filter