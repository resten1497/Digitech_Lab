import { getSchedule } from './util/ScheduleData'

let express = require('express')
let app = express()
import School from 'node-school-kr';

const school = new School()
import bodyParser from 'body-parser';
import { TextMessage ,TextMessage2} from "./views";
import { getAllCalender, getCalendar } from './util/Calendar'
import { getSchoolFood } from './util/SchoolFood'


school.init(School.Type.HIGH, School.Region.SEOUL, 'B100000589')
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())



app.get('/', async function (req, res) {
  res.send("ㅎㅇ")
})

//급식 파트
app.post('/sendFood', async (req, res) => {
  res.send(TextMessage(await getSchoolFood(school)))
})

//일주일 일정
app.post('/getWeekCalendar', async function (req, res) {
  res.send(TextMessage(await getCalendar(school)))
})
//한달 일정
app.post('/getAllCalendar', async (req, res) => {
  res.send(TextMessage(await getAllCalender(school)))
})
//시간표
app.post("/getAllSchedule",(req,res) => {
  let grade = req.body.action.params.grade;
  let classNum = req.body.action.params.classNum;
  res.send(TextMessage(getSchedule(grade,classNum)))

})
// 날씨 정보
app.post('/getWeather', (req, res) => {

})
// 미세먼지
app.post('/getDustPM', (req, res) => {

})
// 초미세먼지



app.listen(port, () => {
  console.log(`app is Listening at ${port}`)
})
