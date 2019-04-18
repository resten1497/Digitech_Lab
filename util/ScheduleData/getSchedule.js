import fs from 'fs';


const getSchedule = (grade,classNum) =>{

  let resultURL = './schedule'

  switch (grade) {
    case '1' :
      resultURL = resultURL + '/FirstGrade/' + classNum + '.json'; break
    case '2':
      resultURL = resultURL +'/SecondGrade/' + classNum + '.json'; break
    case '3':
      resultURL = resultURL +'/ThirdGrade/' + classNum + '.json'; break

  }


  let result = grade + '학년' + classNum + '반 오늘의 시간표' + '\n'
  result += '-------------------------------\n'


  let week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturady']
  let DateData = week[new Date().getDay()]
  let Obj = ''
  if (DateData !== 'sunday' || DateData !== 'saturday') {
    try {
      Obj = JSON.parse(fs.readFileSync(resultURL, 'utf-8'))

      Obj[DateData].forEach(elememt => {
        result += elememt.period + '교시  ' + elememt.ClassRoom + '호 ' + elememt.name + '\n'
      })
      return result
    } catch (e) {
      console.log(e)
    }
  } else {
    return "오늘은 즐거운 주말!"
  }
}

export { getSchedule }