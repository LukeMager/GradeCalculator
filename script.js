var rowCount = 1;

function setUpPage(){
    var spot = document.getElementById("tableHolder");
    var table = document.createElement("table");
    table.setAttribute("id", "myTable");
    spot.appendChild(table);

    addCategory();
}

function addCategory(){
    if(rowCount > 6){
        return false;
    }
    var table = document.getElementById("myTable");
    var textRow = document.createElement("tr");
    var labelRow = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");

    var label = document.getElementById("categoryName").value;
    input1.setAttribute("id","points_" + rowCount);
    input2.setAttribute("id","weight_" + rowCount);
    input1.setAttribute("value", "85,90,95");
    input2.setAttribute("value", "20");

    if(label.length==0){
        label = "Test";
    }

    td1.innerHTML = label + " Points";
    td2.innerHTML = label + " Weight";

    td3.append(input1);
    td4.append(input2);
    labelRow.append(td1);
    labelRow.append(td2);
    textRow.append(td3);
    textRow.append(td4);
    table.append(labelRow);
    table.append(textRow);

    rowCount++;

}

function convertArrayStringToNumber(str){
    var pointsArray = str.split(",");
    for(var i = 0; i< pointsArray.length; i++){
        pointsArray[i] = parseInt(pointsArray[i]);
    }
    return pointsArray;
}

function averageArray(array){
    var total = 0;
    for(var i = 0; i < array.length; i++){
        total += array[i];
    }
    var average = total / array.length;
    return average;
}

function calculateCurrentGrade(){
    var grades = [];
    var gradesWeight = [];
    var yourGrade = 0;
    for(var i = 1; i < rowCount; i++){
        grades.push(document.getElementById("points_" + i).value);
        gradesWeight.push(document.getElementById("weight_" + i).value);
    }

    for(var j = 0; j < grades.length; j++){
        grades[j] = convertArrayStringToNumber(grades[j]);
        grades[j] = averageArray(grades[j]);
    }

    for(var k = 0; k < gradesWeight.length; k++){
        gradesWeight[k] = convertArrayStringToNumber(gradesWeight[k]);
        gradesWeight[k] = averageArray(gradesWeight[k]);
    }

    for(var l = 0; l < rowCount - 1; l++){
        yourGrade += grades[l] * (gradesWeight[l] / 100);
    }

    yourGrade = yourGrade * 100;
    yourGrade = Math.round(yourGrade);
    yourGrade = yourGrade / 100;

    if(yourGrade > 100){
        alert("Your grade is over 100%! If data is incorrect, go back and change it.");
    }

    document.getElementById("currentGrade").innerHTML = "Your grade is " + yourGrade + "%";

    return yourGrade;

}

function calculateGradeNeeded(){
    var desiredGrade = [];
    var finalWeight = [];
    desiredGrade.push(document.getElementById("desiredGrade").value);
    finalWeight.push(document.getElementById("weightOfFinal").value);
    desiredGrade = parseInt(desiredGrade);
    finalWeight = parseInt(finalWeight);
    var currentPoints = (calculateCurrentGrade() / 100) * (1 - finalWeight / 100);
    var pointsNeeded = (desiredGrade / 100) - currentPoints;
    var gradeNeeded = (pointsNeeded / (finalWeight / 100)) * 100;
    gradeNeeded = gradeNeeded * 100;
    gradeNeeded = Math.round(gradeNeeded);
    gradeNeeded = gradeNeeded / 100;

    if(gradeNeeded > 100){
        alert("You will need over 100% on the final. I hope your teacher gives extra credit!");
    }
    document.getElementById("gradeNeeded").innerHTML = "You need a " + gradeNeeded + "% on the final"
}