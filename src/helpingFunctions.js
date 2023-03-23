export const dateConvert = () =>{
    const date = new Date();
    const day =
      date.getDate().toString().length === 2
        ? date.getDate().toString()
        : 0 + date.getDate().toString();
  
    const month =
      (date.getMonth() + 1).toString().length === 2
        ? (date.getMonth() + 1).toString()
        : 0 + (date.getMonth() + 1).toString();
  
    const year = date.getFullYear().toString();
    return {day:day, month:month, year:year}
}