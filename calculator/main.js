document.addEventListener("DOMContentLoaded", function () {
  const newMarkSelect = document.getElementById("newMark").querySelector("select");
  const prevGPA = document.getElementById("currentGPA");
  const prevHours = document.getElementById("currentHours");
  const GPAOutput = document.getElementById("GPA");
  const CGPAOutput = document.getElementById("CGPA");
  const TotalHGPA = document.getElementById('TotalHGPA')
  const TotalHCGPA = document.getElementById('TotalHCGPA')
  document.getElementById("grabData").addEventListener("click", fetchData);

  newMarkSelect.addEventListener("change", updatePreviousMarkState);
  prevGPA.addEventListener("input", updatePreviousMarkState);
  prevHours.addEventListener("input", updatePreviousMarkState);

  let addSubjectBtn = document.getElementById("addSubject");
  addSubjectBtn.addEventListener("click", addSubject);

  let resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", resetSubjects);

  let calculateGPAButton = document.getElementById("calculateGPA");
  calculateGPAButton.addEventListener("click", calculateTheGPA);

  
function applyDarkModeStyles() {
  document.querySelector('body').style.backgroundColor = '#242424';
  document.querySelector('body').style.color = '#fff';

  let header = document.querySelector('h1');
  let allSpans = document.querySelectorAll('span');
  let allPara = document.querySelectorAll('p');
  let allLabels = document.querySelectorAll('label');
  let allInputs = document.querySelectorAll('input');
  let allLis = document.querySelectorAll('li');
  let allLinks = document.querySelectorAll('a');
  let div = document.querySelectorAll('div');
  let svg = document.querySelector('#svg');
  svg.setAttribute('fill', '#fff')
  header.style.color = '#fff';
  allSpans.forEach((s) => { s.style.color = '#fff' });
  allPara.forEach((p) => { p.style.color = '#fff' });
  allLabels.forEach((la) => { la.style.color = '#fff' });
  allInputs.forEach((i) => { i.style.color = '#000' });
  allLis.forEach((l) => { l.style.color = '#fff' });
  div.forEach((d) => { d.style.color = '#fff' });
  allLinks.forEach((a) => { a.style.color = '#209cee' });
}

function removeDarkModeStyles() {
  document.querySelector('body').style.backgroundColor = '';
  document.querySelector('body').style.color = '';

  let header = document.querySelector('h1');
  let allSpans = document.querySelectorAll('span');
  let allPara = document.querySelectorAll('p');
  let allLabels = document.querySelectorAll('label');
  let allInputs = document.querySelectorAll('input');
  let allLi = document.querySelectorAll('li');
  let div = document.querySelectorAll('div');
  let svg = document.querySelector('#svg');
  svg.setAttribute('fill', '#4a4a4a')
  header.style.color = '';
  allSpans.forEach((s) => { s.style.color = '' });
  allPara.forEach((p) => { p.style.color = '' });
  allLabels.forEach((la) => { la.style.color = '' });
  allInputs.forEach((i) => { i.style.color = '' });
  allLi.forEach((l) => { l.style.color = '' });
  div.forEach((d) => { d.style.color = '' });
}

chrome.storage.local.get('darkModeEnabled', function (data) {
  if (data.darkModeEnabled) {
      applyDarkModeStyles();
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'local' && 'darkModeEnabled' in changes) {
      const newDarkModeState = changes.darkModeEnabled.newValue;
      if (newDarkModeState) {
          applyDarkModeStyles();
      } else {
          removeDarkModeStyles();
      }
  }
});


function fetchData() {
  fetch("https://student.aabu.edu.jo/nreg/StdStatus_view.jsp")
    .then(response => response.text())
    .then(html => {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = html;

      const span6s = tempElement.querySelectorAll(".row-fluid .span6");

      const semesterGPAText = span6s[3].innerText.trim(); 
      const cumulativeGPAText = span6s[6].innerText.trim(); 

      const semesterGPA = parseFloat(semesterGPAText.match(/[\d.]+/)[0]); 
      const cumulativeGPA = parseFloat(cumulativeGPAText.match(/[\d.]+/)[0]); 
      prevGPA.value = semesterGPA
      prevHours.value = cumulativeGPA
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
  
  function updatePreviousMarkState() {
    const newMarkSelect = this.closest("li").querySelector(".grade select");
    const previousMarkSelect = this.closest("li").querySelector(".old-grade");
    const prevGPA = document.getElementById("currentGPA");
    const prevHours = document.getElementById("currentHours");
    const hoursInput = this.closest("li").querySelector(".hours");

    if (prevGPA.value.trim() !== "" && prevHours.value.trim() !== "") {
      previousMarkSelect.removeAttribute("disabled");
    } else {
      previousMarkSelect.setAttribute("disabled", "");
    }
  }

  
  function addSubject() {
    const entryTemplate = document.querySelector(".mark-entries-body li");
    if (!entryTemplate) {
      console.error("Entry template not found");
      return;
    }
    const newEntry = entryTemplate.cloneNode(true);

    const oldGradeSelect = newEntry.querySelector(".old-grade");
    if (oldGradeSelect) {
    } else {
      console.error("Old grade select not found in the new entry");
    }

    const deleteButton = newEntry.querySelector(".delete");
    if (deleteButton) {
      deleteButton.addEventListener("click", function () {
        newEntry.parentNode.removeChild(newEntry);
      });
    } else {
      console.error("Delete button not found in the new entry");
    }

    const markEntriesContainer = document.getElementById("markEntries");
    if (markEntriesContainer) {
      markEntriesContainer.appendChild(newEntry);
    } else {
      console.error("Container not found");
    }
  }


  function resetSubjects() {
    let courseNameInputs = document.querySelectorAll(".course-name");
    let hoursInputs = document.querySelectorAll(".hours");
    let gradeSelects = document.querySelectorAll(".grade select");
    let oldGradeSelects = document.querySelectorAll(".old-grade");
    CGPAOutput.textContent = ''
    GPAOutput.textContent = ''
    TotalHCGPA.textContent = ''
    TotalHGPA.textContent = ''

    courseNameInputs.forEach((input) => {
      input.value = "";
    });

    hoursInputs.forEach((input) => {
      input.value = "";
    });

    gradeSelects.forEach((select) => {
      select.value = "";
    });

    oldGradeSelects.forEach((select) => {
      select.value = "";
    });
  }
  
  function calculateTheGPA() {
    let totalGradePoints = 0;
    let totalHours = 0;
    let totalOldGradePoints = 0;
    let totalOldHours = 0;

    const markEntriesContainer = document.getElementById("markEntries");

    const entries = markEntriesContainer.querySelectorAll("#subject");

    entries.forEach((entry) => {
      const hours = parseInt(entry.querySelector(".hours").value) || 0;
      const grade = entry.querySelector(".grade select").value;
      const oldGrade = entry.querySelector(".old-grade").value || "";

      if (oldGrade) {
        const oldGradePoint = getGradePoint(oldGrade);
        totalOldGradePoints += isNaN(oldGradePoint) ? 0 : oldGradePoint * hours;
        totalOldHours += isNaN(hours) ? 0 : hours;
      }

      const gradePoint = getGradePoint(grade);
      totalGradePoints += isNaN(gradePoint) ? 0 : gradePoint * hours;
      totalHours += isNaN(hours) ? 0 : hours;
    });

    const GPA = totalGradePoints / totalHours || 0;
    GPAOutput.textContent = ` ${GPA.toFixed(2)}`;
    TotalHGPA.textContent = `${totalHours}`;
    
    let regularCGPA = GPA;

    if (prevGPA.value && prevHours.value && totalOldGradePoints > 0) {
      const restudiedCGPA = ((parseFloat(prevGPA.value) * parseFloat(prevHours.value)) - totalOldGradePoints + totalGradePoints) / (parseFloat(prevHours.value) + (totalHours - totalOldHours));
      CGPAOutput.textContent = ` ${restudiedCGPA.toFixed(2)}`;
      TotalHCGPA.textContent = `${parseFloat(prevHours.value) + (totalHours - totalOldHours)}`
    } else if (prevGPA.value && prevHours.value) { 
      regularCGPA = ((prevGPA.value * prevHours.value) + totalGradePoints) / (parseFloat(prevHours.value) + (totalHours))
      CGPAOutput.textContent = ` ${regularCGPA.toFixed(2)}`;
      TotalHCGPA.textContent = `${parseFloat(prevHours.value) + (totalHours)}`
    } else {
      const standerCGPA = GPA;
      CGPAOutput.textContent = ` ${standerCGPA.toFixed(2)}`;
      TotalHCGPA.textContent = `${totalHours}`
    }
  
  }

  function getGradePoint(grade) {
    switch (grade) {
      case "A+":
        return 4.0;
      case "A":
        return 3.75;
      case "A-":
        return 3.5;
      case "B+":
        return 3.25;
      case "B":
        return 3.0;
      case "B-":
        return 2.75;
      case "C+":
        return 2.5;
      case "C":
        return 2.25;
      case "C-":
        return 2.0;
      case "D+":
        return 1.75;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        return NaN;
    }
  }
  
});