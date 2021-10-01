// Global
const matchList = document.getElementById("matchList");
const recordsFound = document.getElementById("recordsFound");

// Fetch Data from JSON File
let prizes;
fetch("./prize.json")
    .then((response) => response.json())
    .then((data) => {
        prizes = data['prizes'];
    })

// Search the JSON File with name and output as table
const searchByName = (event) => {
    event.preventDefault()
    let records = 0;
    const name = document.getElementById('searchName').value.toLowerCase().trim();
    if (name) {
        let rows =
            `<tr>
                <th>Year</th>
                <th>First Name</th>
                <th>Surname Name</th>
                <th>Category</th>
                <th>Motivation</th>
                <th>Shares</th>
            </tr>`;
        prizes.forEach((value, k) => {
            Object.values(value.laureates).forEach((v, k) => {
                let fullName = `${v.firstname.toLowerCase()} ${v.surname.toLowerCase()}`
                if (v.firstname.toLowerCase() === name || v.surname.toLowerCase() === name || fullName == name) {
                    records += 1;
                    rows +=
                        `<tr>
                            <td>${value.year}</td>
                            <td>${v.firstname}</td>
                            <td>${v.surname}</td>
                            <td>${value.category}</td>
                            <td>${v.motivation ? v.motivation.slice(1, -1) : 'No data'}</td>
                            <td class="text-nowrap">${v.shares ? v.shares : 'No data'}</td>
                        </tr>`
                }
            });
        });
        recordsFound.innerHTML = `Records Found: <span class="text-danger">${records}</span>`;
        matchList.innerHTML = rows;
    }
}

// Search JSON File by Year
const searchByYear = (event) => {
    event.preventDefault();
    const year = document.getElementById("searchYear").value.toLowerCase().trim();
    let records = 0;
    if (year) {
        let rows = `<tr>
                <th>Year</th>
                <th>Id</th>
                <th>Category</th>
                <th>Overall Motivation</th>
                <th>First Name</th>
                <th>Surname Name</th>
                <th>Motivation</th>
                <th>Shares</th>
            </tr>`;
        prizes.forEach((value, k) => {
            if (value.year == year) {
                Object.values(value.laureates).forEach((v, k) => {
                    records += 1;
                    rows += `<tr>
                        <td>${value.year}</td>
                        <td>${v.id}</td>
                        <td>${value.category}</td>
                        <td>${value.overallMotivation ? value.overallMotivation.slice(1, -1) : "No Data"}</td>
                        <td>${v.firstname}</td>
                        <td>${v.surname}</td>
                        <td>${v.motivation ? v.motivation.slice(1, -1) : "No data"}</td>
                        <td class="text-nowrap">${v.shares ? v.shares : "No data"}</td>
                    </tr>`;
                });
            }
        });
        recordsFound.innerHTML = `Records Found: <span class="text-danger">${records}</span>`;
        matchList.innerHTML = rows;
    }
};