
let DisplayWindow;
let Questions = {};
let BackButton;

let UserCount;
let DayNumber;
let Day = 0;

let DayValueArray = [];

let CurrentPage = "GUEST01";
let crumbs = [];

function begin() {

    DisplayWindow = document.getElementById("DisplayWindow");
    BackButton = document.getElementById("BackButton");
    UserCount = document.getElementById("UserCount");
    DayNumber = document.getElementById("DayNumber");

    let total = 0;
    let newlyAdded = .5;
    DayValueArray.push(0);
    DayValueArray.push(0);
    DayValueArray.push(0);
    for (let i = 1; i < 21; i++) {
        newlyAdded *= 2;
        total += newlyAdded
        DayValueArray.push(total);
    }

    let nl = document.getElementsByName("Question");
    Questions = Array.from(nl);
    showQuestion(CurrentPage);

}

function showQuestion(id, push = true) {
    let q = Questions.find(e => e.id == id);
    DisplayWindow.innerHTML = q.innerHTML;
    BackButton.style.display = (id == "HOME" || id == "DAY22") ? "none" : "block";
    CurrentPage = id;
}

function previous() {

    let prevPage;

    if (CurrentPage == "USER01") prevPage = "HOME";
    else if (CurrentPage == "USER02") prevPage = "USER01";
    else if (CurrentPage == "USER03") prevPage = "USER02";
    else if (CurrentPage == "USER04") prevPage = "USER03";
    else if (CurrentPage == "USER05") prevPage = "USER04";
    else if (CurrentPage == "USER06") prevPage = "USER05";
    else if (CurrentPage == "GUEST01") prevPage = "HOME";
    else if (CurrentPage == "GUEST02") prevPage = "GUEST01";
    else if (CurrentPage == "GUEST03") prevPage = "GUEST02";
    else prevPage = "HOME";

    showQuestion(prevPage);
}

function dayOne() {
    Day = 0;
    nextDay(1);
}

function nextDay(offset) {

    Day += offset;

    if (Day == 0) {
        showQuestion("DEMO-04");
        return;
    }    

    DayNumber.innerHTML = "Your Day " + Day + " User Count";
    UserCount.innerHTML = DayValueArray[Day];

    if (Day == 22) {
        showQuestion("DAY22");
    } else {
        showQuestion("DAY01");
    }


}

function addUser(sponsorName) {
    let inp = document.getElementById("UserNameInput");
    let userName = inp.value;
    let idx = userName.lastIndexOf("/");
    userName = userName.substr(idx + 1);

    if (userName != "") {
        let uri = "/add|" + userName + "|" + sponsorName;
        window.location = uri;
    }
}

function claimBadge(userName) {
    let inp = document.getElementById("TransInput");
    let transId = inp.value;
    if (transId != "") {
        let uri = "/tid|" + userName + "|" + transId;
        window.location = uri;
    }
}


