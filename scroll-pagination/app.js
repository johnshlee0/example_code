const collectionPage = document.getElementById("collection-page"),
    collection = document.getElementById("answer-collection"),
    nomore = document.getElementById("nomore");

let offsetCount = 0, last_id;

const createHtmlContent = (answer, date, newSub) => {
    //create <p> tags for each data property
    const pAnsw = document.createElement('p');
    const pDate = document.createElement('p');

    //combine data as one unit
    const divUnit = document.createElement("div");
    divUnit.append(pAnsw, pDate);

    //css - text-wrapping with left-alignment
    pAnsw.style.whiteSpace = "pre-line";
    pDate.style.whiteSpace = "pre-line";

    //css - limit the width of the answer for legibility
    if (window.innerWidth >= 1280) {
        pAnsw.style.maxWidth = "960px";
    }

    //css - add classes
    pAnsw.classList.add("answer");
    pDate.classList.add("date");
    divUnit.classList.add("dataUnit");

    //actual content from the data
    pAnsw.textContent = answer;
    let t = 0;
    pDate.textContent = date
        // display dates in TWO ROWS by time and d/m/y 
        .replace(/\s/g, function (match) {
            t++;
            return (t === 2) ? "\r\n" : match;
        });

    if (collectionPage.style.display === "block") {
        if (newSub /*the new submission*/) {
            // if there is a newly submitted answer,
            // prepend the newly submitted data to collection
            collection.prepend(divUnit);
        }
        else {
            // if the user is simply viewing the collectionPage without submitting a new answer
            collection.append(divUnit);
        }
    }

    offsetCount += 1;
}

// GET LONG POLL
// if the collectionPage is already in view
const getNewData = () => {
    $.ajax({
        type: "GET",
        url: "includes/ViewNewPoll.inc.php?_id=" + _id,
        async: true,
        cache: false,
        timeout: 50000, // after 50sec, repeat GET request to load the newest answer submission if there is one
        success: function (data) {
            // convert the data into json format and update the "last_id" accordingly as a marker for getNineSInceLast_ID() 
            const json = eval('(' + data + ')');
            _id = json['_id'];
            last_id = json['_id'];

            if (collection.classList.contains("initialLoad") === true) {
                // if the user submits the answer without viewing the collectionPage, 
                // as soon as the answer is submitted, display the collectionPage,
                // and list the new answer at the top of the page by along with nine sequential answers.
                createHtmlContent(json['answer'], json['date'], true);
                getNineSinceLast_ID();
                collection.classList.remove("initialLoad");
            } else {
                // if the user is already viewing the collectionPage,
                // and a new answer is submitted by another user,
                // list the new answer at the top of the page.
                createHtmlContent(json['answer'], json['date'], true);
            }

            //update the counter of all the submitted answers
            getDataCount();

            // repeat GET request to load the newest answer submission if there is one
            setTimeout('getNewData()', 1000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("error:" + textStatus + " (" + errorThrown + ")");
            setTimeout('getNewData()', 15000);
        }
    });
};
$(document).ready(function () {
    getNewData();
});


const getNineSinceLast_ID = () => {
    $.ajax({
        url: "includes/ViewNineSinceLast_ID.inc.php",
        data: { 'last_id': last_id },
        type: 'POST',
        async: true,
        cache: false,
        success: function (data) {
            const json = eval('(' + data + ')');
            for (let a = 0; a < json.length; a++) {
                const answer = json[a].answer;
                const date = json[a].date;
                createHtmlContent(answer, date);
            }
        },
        error: function (request, status, error) {
            console.log("Error: Could not proceed with getNineSinceLast_ID()");
        }
    })
};


// GET Pagination by 10 items at a time
const getTenData = () => {
    if (collectionPage.style.display === "block") {
        // if the page is already in view, append 10 more answers to the list marked by the offsetCount
        $.ajax({
            url: "includes/ViewTenData_a.inc.php",
            data: { 'offsetCount': offsetCount },
            type: 'POST',
            async: true,
            cache: false,
            success: function (data) {
                const json = eval('(' + data + ')');
                // if the page loaded all the answers
                if (json.length <= 0) {
                    console.log("There is no more!");
                    nomore.style.display = "block";
                } else {
                    for (let a = 0; a < json.length; a++) {
                        const answer = json[a].answer;
                        const date = json[a].date;
                        createHtmlContent(answer, date);
                    }
                }
            },
            error: function (request, status, error) {
                console.log("Error: Could not proceed with getTenData_a()");
            }
        });
    } else if (collectionPage.style.display !== "block") {
        // if the page is being loaded the first time, list 10 answers
        $.ajax({
            url: "includes/ViewTenData_b.inc.php",
            type: 'GET',
            async: true,
            cache: false,
            success: function (data) {
                // if the page loaded all the answers
                const json = eval('(' + data + ')');
                if (json.length <= 0) {
                    console.log("There is no more!");
                    nomore.style.display = "block";
                } else {
                    collection.classList.remove("initialLoad");
                    for (let a = 0; a < json.length; a++) {
                        const answer = json[a].answer;
                        const date = json[a].date;
                        createHtmlContent(answer, date);
                    }
                }
            },
            error: function (request, status, error) {
                console.log("Error: Could not proceed with getTenData_b()");
            }
        });
    }
};