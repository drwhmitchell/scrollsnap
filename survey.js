
// Sleep Survey Auto-Generation

const survey = [{question: "What is your AGE?", focus:"AGE", backImage: "survey1.png", min: 10, max:100, default:50},
                {question: "When were you IN-BED/ ASLEEP?", focus:"IN-BED/ASLEEP", backImage: "survey2.png", min: 0, max:12, default:10},
                {question: "When did you WAKE/GETUP?", focus:"WAKE/GET-UP", backImage: "survey3.png", min: 0, max:12, default:6},
                {question: "How often were you AWOKEN?", focus:"AWOKEN", backImage: "survey4.png", min: 0, max:10, default:5},
                {question: "How long did you STAY AWAKE?", focus:"STAY AWAKE", backImage: "survey5.png", min: 0, max:10, default:7},
                {question: "How much did you DREAM?", focus:"DREAM", backImage: "survey6.png", min: 0, max:10, default:5},
                {question: "How do your MUSCLES FEEL?", focus:"MUSCLES FEEL", backImage: "survey7.png", min: 0, max:10, default:5},
                {question: "How positive is your MOOD?", focus:"MOODL", backImage: "survey8.png", min: 0, max:10, default:5},
                {question: "Assign and OVERALL SLEEP RATING", focus:"OVERALL SLEEP RATING", backImage: "survey9.png", min: 0, max:10, default:5},
                ];

function initializePage() {
    console.log("Initializing Page");
    console.log("....");

    var quizEl = document.getElementById("sleep-survey");

    var i = 0;
    const offset = 0;  // Used only for debugging
    var completeSection = "";
    var buf = "";
    var styledQ;
    for (i=0; i<survey.length; i++) {
        newQ = InsertFocus(survey[i].question, survey[i].focus);
        completeSection = "<section class='section' id='section-" + i + offset + "' style='background-image: url(\"img/" + survey[i].backImage + "\");'><div class='question'>";
        //        <div class="answer" id="answer-8">NORMAL</div>
        //           <Input class="slider" type="range" name "" value="5" min="1" max="10" onChange="rangeSlide('answer-9', this.value)" onmousemove="rangeSlide('answer-9', this.value)"></Input>
        completeSection += newQ + "</div>";
        completeSection += '<div class="answer" id="answer-' + i + offset + '">' + survey[i].default + '</div>';
        completeSection += '<Input class="slider" type="range" name "" value="' + survey[i].default + '" min="' + survey[i].min + '" max="' + survey[i].max + '" onChange="rangeSlide(\'answer-' + i + offset + '\', this.value)" onmousemove="rangeSlide(\'answer-' + i + '\', this.value)"></Input>';
        completeSection += "</section>";  // complete survey question
        buf += completeSection;
    }
    quizEl.innerHTML += buf;

    var analysisEl = document.getElementById("sleep-analysis");
    buf = "";
    buf += ' <section class="section" id="section-10">';
    buf += '<div class="question"><span id="focus-word">CALCULATING YOUR SLEEP...</span></div>';
    buf += '<br><br>';
    buf += '<Input class="button" id="analyze-button" name=""></Input>';
    buf += '<img src="img/computing-results.gif">'
    buf += '</section> ';

    analysisEl.innerHTML = buf;

}

function rangeSlide(section, value) {
    document.getElementById(section).innerHTML = value;
}

// insert "<span id='focus-word'>" and a closing "<span>" around KEY in the SENTENCE
function InsertFocus(sentence, key) {
    // Right now does nothing!
     //   "What is your <span id='focus-word'>SEX</span>?</div></section>";

    return(sentence);
}



