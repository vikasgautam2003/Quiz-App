
const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz-box');
const option_list = document.querySelector('.option_list');
const timecount = quiz_box.querySelector('.timer .timer_sec');
const timeline = quiz_box.querySelector('header .time_line');
const next_btn = document.querySelector('.nxt');
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons1 .restart");
const quit_quiz = result_box.querySelector(".buttons1 .quit");



let que_count = 0;
let userscore = 0;
let counter = 15;
let widthvalue = 0;



// Start Button of Quiz

start_btn.onclick = () => {

    info_box.classList.add('activeinfo');
}


// Exit Button of Quiz

exit_btn.onclick = () => {

    info_box.classList.remove('activeinfo');
}


// Continue Button of Quiz

continue_btn.onclick = () => {

        info_box.classList.remove('activeinfo');
        quiz_box.classList.add('activeQuiz');
        showQuestions(0);
        question_Counter(1);
        startTimer(15);
        startTimerLine(0)

        
}






// if next button is clicked

next_btn.onclick = () => {

    if(que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count);
        question_Counter(que_count + 1);
        clearInterval(counter);
        startTimer(15);
        clearInterval(counterline);
        startTimerLine(widthvalue);
        next_btn.style.display ="none";
    }
    else {
        console.log('Questions completed');
        showResultBox();
    }
}


quit_quiz.onclick = ()=>
{
    window.location.reload();
}


restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");

    que_count = 0;
    userscore = 0;
    counter = 15;
    widthvalue = 0;

    showQuestions(que_count);
    question_Counter(que_count + 1);
    clearInterval(counter);
    startTimer(15);
    clearInterval(counterline);
    startTimerLine(widthvalue);
    next_btn.style.display = "none";
};




//gettings questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text span");
    const option_list = document.querySelector(".option_list");
    
    // Access the question from the questions array
    let que_tag =  questions[index].numb + '. ' +questions[index].question;

    // Access the options from the questions array
    let option_tag = '<div class="option">'  + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    
    // Insert the question text into the element
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }

}


let tick = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let cross =  '<div class="icon cross"><i class="fas fa-times"></i></div>'



function optionSelected(answer) 
{
    clearInterval(counter);
    clearInterval(counterline);
    let ans = answer.textContent;
    
    //correct answer
    let correct_ans = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(ans == correct_ans) {
        userscore += 1;
        answer.classList.add('correct');
        console.log('Answer is correct');
        answer.insertAdjacentHTML('beforeend', tick);
    }
    else{
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML('beforeend', cross);
        console.log('Answer is incorrect');

        // if the answer is incorrect then automatically show the correct answer

        for(let i = 0; i < allOptions; i++)
        {
            if(option_list.children[i].textContent == correct_ans) 
            {
                option_list.children[i].setAttribute('class', 'option correct');
                option_list.children[i].insertAdjacentHTML('beforeend', tick);
            }
        }  

    }

    // once user selected the answer disable all options

    for(let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disabled'); 
    }

    next_btn.style.display ="block";

}



function showResultBox()
{

    info_box.classList.remove('activeinfo');
    quiz_box.classList.remove('activeQuiz');
    result_box.classList.add('activeResult');

    const scoreText = result_box.querySelector(".score_text");

    if (userscore <= 15) {
        let scoreTag = '<span>and sorry, You got only <p>' + userscore +' </p>out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } 
    else if (userscore > 15 && userscore < 20) {
        let scoreTag = '<span>Good job! You got <p>' + userscore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } 
    else if (userscore === 20) {
        let scoreTag = '<span>Excellent! You got a perfect score of <p>' + userscore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }


}





function question_Counter(index)
{
    const bottom_ques_counter = document.querySelector('.total_que');

    let count =  '<span><p>' + index + '</p>Of<p>' +  questions.length +' </p>Questions</span>'
    
    bottom_ques_counter.innerHTML = count;

}

function startTimer(time)
{
    counter= setInterval(timer, 1000);

    function timer() {
        timecount.textContent = time;
        time--;

        if(time < 9) {
            let addZero = timecount.textContent;
            timecount.textContent = '0' + addZero;
        }

        if(time < 0) {
            clearInterval(counter);
            timecount.textContent = '00';
        }
    }
}


function startTimerLine(time)
{
    counterline= setInterval(timer, 29);

    function timer() {
        time += 1;

        timeline.style.width = time + "px";

        if(time > 549)
        {
            clearInterval(counterline);
        }
    }
}