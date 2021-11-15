
let DisplayWindow;
let Questions = {};


function begin() {

    DisplayWindow = document.getElementById("DisplayWindow");

    let nl = document.getElementsByName("Question");
    Questions = Array.from(nl);
    showQuestion("PAGE01");

}

function showQuestion(id, push = true) {
    let q = Questions.find(e => e.id == id);
    DisplayWindow.innerHTML = q.innerHTML;
}

function addUser(sponsorName) {
    let inp = document.getElementById("UserNameInput");
    let userName = inp.value;

    if (userName != "") {
        let uri = "/add|" + userName + "|" + sponsorName;
        window.location = uri;
    }
}