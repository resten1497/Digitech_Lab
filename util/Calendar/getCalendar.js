
const formatDate = (date) => {
  let myweekday = date.getDate()
  return (myweekday)
}
const getCalendar = async (school) =>{

  const calendar = await school.getCalendar()
  let nullData = 0
  let result = '이번 주 일정은'
  let Data = []
  let now = new Date()
  let nowDayOfWeek = now.getDay()
  let nowDay = now.getDate()
  let nowMonth = now.getMonth()
  let nowYear = now.getYear()
  nowYear += (nowYear < 2000) ? 1900 : 0
  let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
  let weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) - 1)
  for (let i = formatDate(weekStartDate); i <= formatDate(weekEndDate); i++) {
    if (!calendar[i]) {
      nullData++
    } else {
      Data.push('\n' + i + '일 :' + calendar[i])
    }
  }
  if (nullData === 5) {
    return (result + '없습니다')
  } else {
    result += '\n---------------------'
    Data.forEach(element => {
      result += element
    })
    return(result)
  }

}

export {getCalendar}