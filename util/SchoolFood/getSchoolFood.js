

const getSchoolFood = async (school) =>{

  const meal = await school.getMeal()
  if (meal) {
    let result = '오늘의 급식 \n-----------------\n'
    const $date = new Date()
    let $day = $date.getDate()

    let cutString = meal[$day].replace(/\./g, '')
    cutString = cutString.replace(/[0-9]개/g, '')
    cutString = cutString.replace(/([0-9])/g, '')
    if (cutString.indexOf('[석식]')) cutString = cutString.replace('[석식]', '\n-----------------\n[석식]\n')
    let data = cutString.split('\n')

    data.forEach(element => {
      if (element) {
        result += element + '\r\n'
      }
    })

    result = result.slice(0, -1)
    return result
  } else {
    return '값없음'
  }


}

export {getSchoolFood}