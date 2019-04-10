let express = require('express');
let app = express();


const School = require('node-school-kr');
const school = new School();
school.init(School.Type.HIGH, School.Region.SEOUL, 'B100000589');


const port = process.env.PORT || 3000;
let fs = require("fs");
let bodyParser = require('body-parser');
let TextMessage = require('./views/index');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


function formatDate(date) {
    let mymonth = date.getMonth()+1;
    let myweekday = date.getDate();
    return (myweekday);
}

function setLinkToSchedule(grade,classNum){

    let result = './schedule';
    switch (grade) {
        case "1" :
            result += "/FirstGrade/"+classNum+".json";break;
        case "2":
            result += "/SecondGrade/"+classNum+".json";break;
        case "3":
            result += "/ThirdGrade/"+classNum+".json";break;
        default:
            result = null; return result; break;
    }
    return result;

}






app.get('/',function (req,res) {
    res.send(TextMessage("안녕!"));
})




app.post('/sendFood',async function(req,res){

    const meal = await school.getMeal();
    if(meal){
        let result = "오늘의 급식 \n-----------------\n";
        const $date = new Date();
        let $day = $date.getDate();
 
        let cut_string = meal[$day].replace(/\./g,"");
        cut_string = cut_string.replace(/[0-9]개/g,"");
        cut_string = cut_string.replace(/([0-9])/g, "");
        if(cut_string.indexOf("[석식]")) cut_string = cut_string.replace("[석식]","\n-----------------\n[석식]\n");
        let data = cut_string.split("\n");

        data.forEach(element => {
            if(element){
                result += element +"\r\n";
            }
        });

        result = result.slice(0,-1);
        res.send(TextMessage(result));

    }
    else{
        res.send(TextMessage("값없음"));
    }


});



app.post("/getWeekCalendar", async function(req,res){
    const calendar = await school.getCalendar()
    let nullData = 0;
    let result = "이번 주 일정은" ;
    let Data= new Array();
    let now = new Date();
    let nowDayOfWeek = now.getDay();
    let nowDay = now.getDate();
    let nowMonth = now.getMonth();
    let nowYear = now.getYear();
    nowYear += (nowYear < 2000) ? 1900 : 0;
    let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+1);
    let weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) -1);
    for(let i = formatDate(weekStartDate);i<=formatDate(weekEndDate);i++){
        if(!calendar[i]){
            nullData++;
        }else{
            Data.push("\n"+i+"일 :"+calendar[i]);
        }
    }
    if(nullData===5){
        res.send(TextMessage(result+"없습니다"))
    }
    else{
        result += "\n---------------------"
        Data.forEach(element=>{
            result+=element;
        })
        res.send(TextMessage(result))
    }

});

app.post("/getAllCalendar", async function(req,res){
    const calendar = await school.getCalendar()

    let result = "이번 달 일정은" ;
    result += "\n---------------------";
    for(let i = 1 ; i<Object.keys(calendar).length-2 ; i++){
        if(calendar[i]) {
            result += "\n" + i + "일 :" + calendar[i];
        }
        }

    res.send(TextMessage(result))




});



app.post("/getAllSchedule",function (req,res) {

    let grade = req.body.action.params.grade;
    let classNum = req.body.action.params.classNum;

    let result = grade+"학년"+classNum+"반 오늘의 시간표"+"\n";
    result += "-------------------------------\n"

    let URLData = setLinkToSchedule(grade,classNum);
    let week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturady'];
    let DateData = week[new Date().getDay()];
    let Obj = "";
    if(DateData!=="sunday" || DateData!=="saturday") {
        try{
            Obj = JSON.parse(fs.readFileSync(URLData, 'utf-8'));

            Obj[DateData].forEach(elememt=>{
                result += elememt.period+"교시  "+elememt.ClassRoom+"호 "+elememt.name+"\n";

            })
            res.send(TextMessage(result));


        }catch (e) {
            res.send(TextMessage("오늘은 즐거운 주말이에요!"));

        }
    }else{
        res.send(TextMessage("오늘은 즐거운 주말이에요!"));

    }

})



app.listen(port, () => {
    console.log(`app is Listening at ${port}`);
});
