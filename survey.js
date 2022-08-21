
// Sleep Survey Generation and Computation 

// Globals and Statics.   Rather not have these, but right now too painful to work around!
const STATIC = 0;       // whether the background images in the survey are static or dynamic
const DYNAMIC = 1;
// Types of survey question answers
const NUMBER = 0;
const YEARS = 1;
const TIME = 2;
const MINUTES = 3;
// Booleans
const FALSE = 0;
const TRUE = 1;
var gSurveyNum = 0;
var gSurveyQuestion = 0;  
const allSurveys = [
                    {name: "Classic", computeFcn: defaultComputeFcn, survey: [
                        {question: "What is your AGE?", focus:"AGE", imageMode: STATIC, backImage: "survey1.png", type: YEARS, typeLabel: 'years', min: 10, max:90, step:10, default:50, answer:50, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "When did you fall ASLEEP?", focus:"ASLEEP", imageMode: STATIC, backImage: "survey2.png", type: TIME, typeLabel: '', min: 100, max:2400, step:100,default:2100, answer:2100, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "When did you ARISE?", focus:"ARISE", imageMode: STATIC, backImage: "survey3.png", type: TIME, typeLabel: '',min: 100, max:2400, step:100,default:600, answer:600, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How many DREAMS did you have?", focus:"DREAMS", imageMode: STATIC, backImage: "survey6.png", type: NUMBER, typeLabel: '', min: 0, max:5, step:1,default:1, answer:1, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How many times did you WAKE?", focus:"WAKE", imageMode: STATIC, backImage: "survey4.png",  type: NUMBER, typeLabel: '', min: 0, max:10, step:1,default:3, answer:3, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How long did you STAY AWAKE?", focus:"STAY AWAKE", imageMode: STATIC, backImage: "survey5.png",  type: MINUTES, typeLabel: 'minutes',min: 0, max:60, step:1,default:7, answer:7, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How do your MUSCLES FEEL now?", focus:"MUSCLES FEEL", imageMode: STATIC, backImage: "survey7.png", type: NUMBER, typeLabel: 'relative scale', min: 0, max:10, step:1,default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Assign and OVERALL SLEEP RATING", focus:"OVERALL SLEEP RATING", imageMode: STATIC, backImage: "survey9.png", type: NUMBER, typeLabel: 'relative scale', min: 0, max:10, step:1,default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                    ]},         
                    {name: "Tik-Tok", computeFcn: defaultComputeFcn, survey: [         
                        {question: "What is your AGE?", focus:"AGE", imageMode: DYNAMIC, backImage: "age-anim.gif", min: 10, max:100, default:50, answer:50, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "When were you IN-BED/ ASLEEP?", focus:"IN-BED/ ASLEEP", imageMode: DYNAMIC, backImage: "inbed-anim.gif", min: 0, max:12, default:10, answer:10, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "When did you WAKE/GETUP?", focus:"WAKE/GETUP", imageMode: DYNAMIC, backImage: "wakeup-anim.gif", min: 0, max:12, default:6, answer:6, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How often were you AWOKEN?", focus:"AWOKEN", imageMode: DYNAMIC, backImage: "awoken-anim.gif", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How long did you STAY AWAKE?", focus:"STAY AWAKE", imageMode: DYNAMIC, backImage: "waso-anim.gif", min: 0, max:10, default:7, answer:7, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How much did you DREAM?", focus:"DREAM", imageMode: DYNAMIC, backImage: "dreams-anim.gif", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How do your MUSCLES FEEL?", focus:"MUSCLES FEEL", imageMode: DYNAMIC, backImage: "muscles-anim.gif", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "How positive is your MOOD?", focus:"MOOD", imageMode: DYNAMIC, backImage: "mood-anim.gif", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Assign and OVERALL SLEEP RATING", focus:"OVERALL SLEEP RATING", imageMode: DYNAMIC, backImage: "rating-anim.gif", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                    ]},
                    {name: "Terse", computeFcn: defaultComputeFcn, survey: [         
                        {question: "How OLD are you?", focus:"OLD", imageMode: STATIC, backImage: "survey-generic.png", min: 10, max:100, default:50, answer:50, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Time of IN-BED & ASLEEP?", focus:"IN-BED & ASLEEP", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:12, default:10, answer:10, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Time of WAKE & GETUP?", focus:"WAKE & GETUP", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:12, default:6, answer:6, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Frequency of WAKES?", focus:"WAKES", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Duration of WAKES?", focus:"WAKES", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:10, default:7, answer:7, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Amount of DREAMING?", focus:"DREAMING", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Level of MUSCLE RELAXATION?", focus:"MUSCLE RELAXATION", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Relative MOOD?", focus:"MOOD", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "Overall SLEEP RATING", focus:"SLEEP RATING", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                    ]},
                    {name: "Basic", computeFcn: defaultComputeFcn, survey: [         
                        {question: "How good do you FEEL?", focus:"FEEL", imageMode: STATIC,backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                        {question: "What's your overall SLEEP RATING?", focus:"SLEEP RATING", imageMode: STATIC, backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, validator: dummyValidator, warpFcn: dummyWarpFcn},
                    ]},
                ];

function initializePage() {
    console.log("Initializing Page");
    gSurveyQuestion = 0;

    var introEl = document.getElementById("introduction");
    var buf = "";

    buf += '    <section class="section" id="section-1">';
    buf += '    <div class="question">Which <span id="focus-word">Survey</span> would you like to take?</div>';
    buf += '    <div class="answer" id="answer-0"></div>';
    for (i=0; i<allSurveys.length; i++) 
        buf += '        <button type="button" onclick="RunSurvey(' + i + ')">' + allSurveys[i].name + '</button><br>';
    buf += '    </section>'
    introEl.innerHTML = buf;
}

function SnapScrollAction(amount) {

    var quizWindowHeight = window.innerHeight;
    var quizFrameNum = Math.floor(amount/quizWindowHeight);
    if (quizFrameNum > gSurveyQuestion) 
        allSurveys[gSurveyNum].survey[gSurveyQuestion].validator(gSurveyQuestion);
    else if (quizFrameNum < gSurveyQuestion)
        console.log("Retreated to prev Q:" + quizFrameNum);
    gSurveyQuestion = quizFrameNum;
}

function dummyValidator(index) {
    console.log("Calling Q" + index +  " ValidatorFcn with Answer: " + this.answer);
}

// Translates from 0-2300 to AM/PM time
// SuppressMin is useful for drawing less on the scale
function MilitaryTimeTranslate(value, suppressMin) {
    var hours = Math.floor(value/100);
    var hoursString = "";
    var minString = "";
    var mins = value - (hours * 100);
    var suffix = "";
    var finalString;

    if (hours > 0 && hours <= 12) {
        hoursString = hours.toString();
        suffix = "am";
      } else if (hours > 12) {
        hours = hours - 12;
        hoursString = hours.toString();
        suffix = "pm";
      } else if (hours == 0) {
        hoursString= "12";
        suffix = "am";
      }

    if (mins < 10) 
        minString = "0" + mins.toString(); 
    else
        minString = mins.toString();
    if (suppressMin) 
        finalString = hoursString + suffix;
    else
        finalString = hoursString + ":" + minString + suffix;
    
    console.log("Military String = " + finalString)
    return(finalString);
}

// Returns a string which is the appropriate display label for the value with this type
function TranslateType(type, value, shortFlag) {
    switch (type) {
        case YEARS : return(shortFlag ? value : value + " Years");
        case MINUTES : return(shortFlag ? value : value + " Minutes");
        case TIME : return MilitaryTimeTranslate(value, shortFlag);
    }
    return value;
}

// Generates a text string for a "tickList" for a range control
function GenScale(min, max, step, type, defaultVal) {
    var buf = "";
    buf +=   '<datalist id="tickList">'
    for (i=min; i<=max; i+=step) {
//        if (i==min || i==max || i==defaultVal) {
        if (i==min || i==max) {

            buf += '<option value="' + i + '" label="' + TranslateType(type, i, TRUE) + '"></option>';
        } else {
            buf += '<option value="' + i + '"></option>';
        }
    }
    buf +=   '</datalist>'

    return buf;
}

function RunSurvey(surveyNum) {
    gSurveyNum = surveyNum;         // Tuck this into a global for now.
    console.log("Running Survey");

    var introEl = document.getElementById("introduction");
    var quizEl = document.getElementById("sleep-survey");

    // Validate survey choice
    if (surveyNum >= allSurveys.length || surveyNum < 0)
        return;

    // Nuke the intro choice section so we move to the survey
    introEl.innerHTML = "";

    var i = 0;
    const offset = 0;  // Used only for debugging
    var addedStyling = "";
    var backgroundStyle = "";
    var completeSection = "";
    var newQ = "";
    var buf = "";
    for (i=0; i<allSurveys[surveyNum].survey.length; i++) {
        completeSection = "";
        newQ = InsertFocus(allSurveys[surveyNum].survey[i].question, allSurveys[surveyNum].survey[i].focus);
        if (allSurveys[surveyNum].survey[i].imageMode == DYNAMIC) {
            addedStyling = ' no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;'
            backgroundStyle = "background:";
        } else {  // Assume STATIC
            addedStyling = "";
            backgroundStyle = "background-image:";
        }
        completeSection = "<section class='section' id='section-" + i + offset + "' style='" + backgroundStyle + " url(\"img/" + allSurveys[surveyNum].survey[i].backImage + "\")" + addedStyling + "'><div class='question'>";
        completeSection += newQ + "</div>";
        completeSection += '<div class="answer" id="answer-' + i + offset + '">' + TranslateType(allSurveys[surveyNum].survey[i].type, allSurveys[surveyNum].survey[i].default, FALSE) + '</div>';
        completeSection += '<input class="slider" type="range" name "" list="tickList" value="' + allSurveys[surveyNum].survey[i].default + '" min="' + allSurveys[surveyNum].survey[i].min + '" max="' + allSurveys[surveyNum].survey[i].max + '" onChange="rangeSlide(\'answer-' + i + offset + '\', this.value, ' + i + ')" oninput="rangeSlide(\'answer-' + i + offset + '\', this.value,' +  i + ')"></Input>';
        completeSection += GenScale(allSurveys[surveyNum].survey[i].min, allSurveys[surveyNum].survey[i].max, allSurveys[surveyNum].survey[i].step, allSurveys[surveyNum].survey[i].type, allSurveys[surveyNum].survey[i].default);

        completeSection += "</section>";  // complete survey question
        buf += completeSection;
    }
    quizEl.innerHTML = buf;

    // Now add the last question to make the analysis "go"
    var analysisGoEl = document.getElementById("analysis-go");
    analysisGoEl.innerHTML = "";
    buf = "";
    buf += '<section class="section">';
    buf += '<div class="question"><span id="focus-word">THANK YOU!</span> Are you ready see your <span id="focus-word">Sleep Analysis?</span></div>';
    buf += '<div class="answer" id="sleep-analysis-go"></div>';
    buf += '  <button type="button" onclick="RunAnalysis()">Let\'s Go!</button>';
    buf += '  <br></section>';
    analysisGoEl.innerHTML = buf;
}


function RunAnalysis() {
    console.log("At Analysis trigger for Survey#", gSurveyNum);

    // First disappear the survey
    var quizEl = document.getElementById("sleep-survey");
    quizEl.innerHTML = "";

    // Now draw the Analysis wait cursor....
    var analysisGoEl = document.getElementById("analysis-go");
    analysisGoEl.innerHTML = "";
    var analysisEl = document.getElementById("sleep-analysis");
    var buf = "";
    buf += ' <section class="section">';
    buf += '<div class="question">Analyzing your sleep...</span></div>';
    buf += '<br><br>';
    buf += '<img src="img/brainwaves.gif">'
    buf += '</section> ';
    analysisEl.innerHTML = buf;

    // Now compute the analysis
    ComputeAnalysis(allSurveys[gSurveyNum].survey.map(el => (el.value != null) ? el.value : el.default));

    // Wait for 2 secs, then display the results
    setTimeout(displayAnalysis, 4000);
}

function displayAnalysis() {
    var analysisEl = document.getElementById("sleep-analysis");
    var buf = "";

    // Hypnogram
    buf += ' <section class="section"> \
             <div class="answer-heading">HYPNOGRAM (Sleep Clock)</div>  \
             <img src="img/sample-hypnochron.png" width="320">  \
             <div class="description"><span style="color:red;">RED</span> = Awake<br> \
                                     <span style="color:#b5f4fb;">LT BLUE</span> = REM Sleep<br> \
                                     <span style="color:#0087c1;">MED BLUE</span> = LIGHT Sleep<br> \
                                     <span style="color:#062a87;">DARK BLUE</span> = DEEP Sleep \
             </div>  \
            </section> ';

    // Stats
    buf += ' <section class="section"> \
            <div class="answer-heading">SLEEP STATS</div>  \
            <img src="img/sample-hypnochron.png" width="320">  \
            </div>  \
           </section> ';

    // Diagnosis
    buf += ' <section class="section"> \
    <div class="answer-heading">SLEEP DIAGNOSIS</div><br><br> \
    <div class="diagnosis"> \
        <li>Your DEEP SLEEP is below average for your age.</li> \
        <li>Your SLEEP EFFICIENCY could use some improvement.</li> \
        <li>Your OVERALL SLEEP SATISFACTION is lacking.</li> \
    </ul></div>  \
   </section> ';

    analysisEl.innerHTML = buf;
};


function ComputeAnalysis(ansList) {
    console.log("Computing Results for Survey#" + gSurveyNum + " from " + JSON.stringify(ansList));

    //  This is where the magic happens!   We successively apply all of the Warp functions associated
    //  with each question in the survey and get a net result which is the final sleep arch!
    netResult = allSurveys[gSurveyNum].survey.reduce((accum, currentQ) => currentQ.warpFcn(accum, currentQ.answer), 0);
    console.log("Net Result = " + netResult);
}

function defaultComputeFcn () {

}

function dummyWarpFcn(accum, answer) {
    console.log("Dummy warp function called with: " + answer);
    return (accum + answer);
}

function rangeSlide(section, value, i) {

    document.getElementById(section).innerHTML = TranslateType(allSurveys[gSurveyNum].survey[i].type, value, FALSE);
    allSurveys[gSurveyNum].survey[i].value = value;

}

// insert "<span id='focus-word'>" and a closing "<span>" around KEY in the SENTENCE
function InsertFocus(sentence, key) {
     //   "What is your <span id='focus-word'>SEX</span>?</div></section>";
    const newSentence = sentence.replace(key, "<span id='focus-word'>" + key + "</span>");
    return newSentence;

}



