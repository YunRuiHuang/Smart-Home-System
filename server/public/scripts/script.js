// alert("script run success")

var tablecontainer = document.getElementById('table-container')
var table = document.createElement('table')

fetch('/routers/data/1/10')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // You can also use response.text() for plain text
    })
    .then(data => {
        // console.log(data);
        var headerRow = table.insertRow();
        for (var key in data.rows[0]) {
            var th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }

        // Create data rows
        data.rows.forEach(function(rowData) {
            var row = table.insertRow();
            for (var key in rowData) {
                var cell = row.insertCell();
                cell.textContent = rowData[key];
            }
        });

        tablecontainer.appendChild(table);


    })
    .catch(error => {
        // Handle errors here
        console.error('Error:', error);
    });



document.getElementById("myButton").addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/routers/music/state", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Request was successful, handle response if needed
            console.log("PUT request successful");
        } else {
            // Request failed or is still processing
            console.error("Error in PUT request");
        }
    };
    xhr.send();
    fetchMusicInfo();
});

// Function to make a GET request and update the content of the <p> tag
function fetchMusicInfo() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/routers/music/playing", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Request was successful, update <p> tag content with response
            var responseData = JSON.parse(xhr.responseText);
            document.getElementById("musicInfo").innerText = "Currently playing: " + responseData.playing;
        } else {
            // Request failed or is still processing
            console.error("Error in GET request");
        }
    };
    xhr.send();
}

// Call the function to fetch music information when the page loads
window.onload = fetchMusicInfo;