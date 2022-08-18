
// Sleep Survey Auto-Generation

const surveys = [
                    [
                        {question: "What is your AGE?", focus:"AGE", backImage: "survey1.png", min: 10, max:100, default:50, answer:50, warpFcn: dummyWarpFcn},
                        {question: "When were you IN-BED/ ASLEEP?", focus:"IN-BED/ ASLEEP", backImage: "survey2.png", min: 0, max:12, default:10, answer:10, warpFcn: dummyWarpFcn},
                        {question: "When did you WAKE/GETUP?", focus:"WAKE/GETUP", backImage: "survey3.png", min: 0, max:12, default:6, answer:6, warpFcn: dummyWarpFcn},
                        {question: "How often were you AWOKEN?", focus:"AWOKEN", backImage: "survey4.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "How long did you STAY AWAKE?", focus:"STAY AWAKE", backImage: "survey5.png", min: 0, max:10, default:7, answer:7, warpFcn: dummyWarpFcn},
                        {question: "How much did you DREAM?", focus:"DREAM", backImage: "survey6.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "How do your MUSCLES FEEL?", focus:"MUSCLES FEEL", backImage: "survey7.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "How positive is your MOOD?", focus:"MOOD", backImage: "survey8.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "Assign and OVERALL SLEEP RATING", focus:"OVERALL SLEEP RATING", backImage: "survey9.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                    ],
                    [
                        {question: "What is your AGE?", focus:"AGE", backImage: "age-anim.gif", min: 10, max:100, default:50, answer:50, warpFcn: dummyWarpFcn},
                        {question: "When were you IN-BED/ ASLEEP?", focus:"IN-BED/ ASLEEP", backImage: "inbed-anim.gif", min: 0, max:12, default:10, answer:10, warpFcn: dummyWarpFcn},
                        {question: "When did you WAKE/GETUP?", focus:"WAKE/GETUP", backImage: "wakeup-anim.gif", min: 0, max:12, default:6, answer:6, warpFcn: dummyWarpFcn},
                        {question: "How often were you AWOKEN?", focus:"AWOKEN", backImage: "awoken-anim.gif", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "How long did you STAY AWAKE?", focus:"STAY AWAKE", backImage: "waso-anim.gif", min: 0, max:10, default:7, answer:7, warpFcn: dummyWarpFcn},
                        {question: "How much did you DREAM?", focus:"DREAM", backImage: "dreams-anim.gif", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "How do your MUSCLES FEEL?", focus:"MUSCLES FEEL", backImage: "muscles-anim.gif", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "How positive is your MOOD?", focus:"MOOD", backImage: "mood-anim.gif", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "Assign and OVERALL SLEEP RATING", focus:"OVERALL SLEEP RATING", backImage: "rating-anim.gif", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                    ],
                    [
                        {question: "How OLD are you?", focus:"OLD", backImage: "survey-generic.png", min: 10, max:100, default:50, answer:50, warpFcn: dummyWarpFcn},
                        {question: "Time of IN-BED & ASLEEP?", focus:"IN-BED & ASLEEP", backImage: "survey-generic.png", min: 0, max:12, default:10, answer:10, warpFcn: dummyWarpFcn},
                        {question: "Time of WAKE & GETUP?", focus:"WAKE & GETUP", backImage: "survey-generic.png", min: 0, max:12, default:6, answer:6, warpFcn: dummyWarpFcn},
                        {question: "Frequency of WAKES?", focus:"WAKES", backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "Duration of WAKES?", focus:"WAKES", backImage: "survey-generic.png", min: 0, max:10, default:7, answer:7, warpFcn: dummyWarpFcn},
                        {question: "Amount of DREAMING?", focus:"DREAMING", backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "Level of MUSCLE RELAXATION?", focus:"MUSCLE RELAXATION", backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "Relative MOOD?", focus:"MOOD", backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "Overall SLEEP RATING", focus:"SLEEP RATING", backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                    ],
                    [
                        {question: "How good do you FEEL?", focus:"FEEL", backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                        {question: "What's your overall SLEEP RATING?", focus:"SLEEP RATING", backImage: "survey-generic.png", min: 0, max:10, default:5, answer:5, warpFcn: dummyWarpFcn},
                    ],
                ];

function initializePage() {
    console.log("Initializing Page");
    gSurveyQuestion = 0;
}

// Globals.   Rather not have these, but right now too painful to work around!
var gSurveyNum = 0;
var gSurveyQuestion = 0;  

function SnapScrollAction(amount) {

    var quizWindowHeight = window.innerHeight;
    var quizFrameNum = Math.floor(amount/quizWindowHeight);
    if (quizFrameNum > gSurveyQuestion) 
        console.log("Advanced to next Q:" + quizFrameNum);
    else if (quizFrameNum < gSurveyQuestion)
        console.log("Retreated to prev Q:" + quizFrameNum);
    gSurveyQuestion = quizFrameNum;
}

function RunSurvey(surveyNum) {
    gSurveyNum = surveyNum;         // Tuck this into a global for now.
    console.log("Running Survey");

    var introEl = document.getElementById("introduction");
    var quizEl = document.getElementById("sleep-survey");

    // Validate survey choice
    if (surveyNum >= surveys.length || surveyNum < 0)
        return;

    // Nuke the intro choice section so we move to the survey
    introEl.innerHTML = "";

    var i = 0;
    const offset = 0;  // Used only for debugging
    const addedStyling = 'no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;'
    var completeSection = "";
    var buf = "";
    for (i=0; i<surveys[surveyNum].length; i++) {
        newQ = InsertFocus(surveys[surveyNum][i].question, surveys[surveyNum][i].focus);
        completeSection = "<section class='section' id='section-" + i + offset + "' style='background: url(\"img/" + surveys[surveyNum][i].backImage + "\")" + addedStyling + "'><div class='question'>";
        completeSection += newQ + "</div>";
        completeSection += '<div class="answer" id="answer-' + i + offset + '">' + surveys[surveyNum][i].default + '</div>';
        completeSection += '<Input class="slider" type="range" name "" value="' + surveys[surveyNum][i].default + '" min="' + surveys[surveyNum][i].min + '" max="' + surveys[surveyNum][i].max + '" onChange="rangeSlide(\'answer-' + i + offset + '\', this.value, ' + i + ')" onMouseMove="rangeSlide(\'answer-' + i + offset + '\', this.value,' +  i + ')"></Input>';
        completeSection += "</section>";  // complete survey question
        buf += completeSection;
    }
    quizEl.innerHTML = buf;
}


function RunAnalysis() {
    console.log("At Analysis trigger for Survey#", gSurveyNum);

    var buf;
    var analysisGoEl = document.getElementById("analysis-go");
    analysisGoEl.innerHTML = "";

    var analysisEl = document.getElementById("sleep-analysis");
    buf += ' <section class="section">';
    buf += '<div class="question">Here is your SLEEP ANALYSIS...</span></div>';
    buf += '<br><br>';
    buf += '<img src="img/computing-results.gif">'
    buf += '</section> ';

    analysisGoEl.innerHTML = buf;

    // Now compute the analysis
    ComputeAnalysis(surveys[gSurveyNum].map(el => (el.value != null) ? el.value : el.default));
}

function ComputeAnalysis(ansList) {
    console.log("Computing Results for Survey#" + gSurveyNum + " from " + JSON.stringify(ansList));

    //  This is where the magic happens!   We successively apply all of the Warp functions associated
    //  with each question in the survey and get a net result which is the final sleep arch!
    netResult = surveys[gSurveyNum].reduce((accum, currentQ) => currentQ.warpFcn(accum, currentQ.answer), 0);
    console.log("Net Result = " + netResult);
}

function dummyWarpFcn(accum, answer) {
    console.log("Dummy warp function called with: " + answer);
    return (accum + answer);
}

function rangeSlide(section, value, i) {
    document.getElementById(section).innerHTML = value;
    surveys[gSurveyNum][i].value = value;

}

// insert "<span id='focus-word'>" and a closing "<span>" around KEY in the SENTENCE
function InsertFocus(sentence, key) {
     //   "What is your <span id='focus-word'>SEX</span>?</div></section>";
    const newSentence = sentence.replace(key, "<span id='focus-word'>" + key + "</span>");
    return newSentence;

}



