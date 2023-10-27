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
