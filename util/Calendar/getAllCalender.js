
const getAllCalender = async (school) => {
  const calendar = await school.getCalendar()

  let result = '이번 달 일정은'
  result += '\n---------------------'
  for (let i = 1; i < Object.keys(calendar).length - 2; i++) {
    if (calendar[i]) {
      result += '\n' + i + '일 :' + calendar[i]
    }
  }

  return result;

}

export { getAllCalender }