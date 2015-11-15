// JavaScript functions for BookStore Transaction access
// Lee Middleton
// Portland Community College
// CIS 122

function reloadTransactions()
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: reloadTransactions");
		return false;
	}
	else {
		request.open("GET", "php/restoreTransactionTable.php", false);
		request.send();
		return request.responseText;
	}
}

function getAllTransactions()
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: getAllTransactions");
		return false;
	}
	else {
		request.open("GET", "php/accessTransactions.php", false);
		request.send();
		return convertToObject(request.responseText);
	}
}

// BEGIN BOOK/TRANSACTION FUNCTIONS

// If the identified book exists, get the title
function getBookTitleByISBN(isbn)
{
	var book = getBookByIsbn(isbn);
	if (book != undefined)
		return book.TITLE;
	return undefined;
}

// If the identified book exists, get the author name
function getBookAuthorByISBN(isbn)
{
	var book = getBookByIsbn(isbn);
	if (book != undefined)
		return book.AUTHOR;
	return undefined;
}

// If the identified book exists, get the publisher name
function getBookPublisherByISBN(isbn)
{
	var book = getBookByIsbn(isbn);
	if (book != undefined)
		return book.PUBLISHER;
	return undefined;
}
// END BOOK/TRANSACTION SECTION

// BEGIN UTILITY FUCTIONS 
// Checks a simple array of values for the presence of value.
function Contains (arrayOfValues, value)
{
	var index = 0;
	while (index < arrayOfValues.length)
	{
		if (arrayOfValues[index] === value)
			return true;
		index++;
	}
	return false;
}

// Converts transaction types from numeric value to text value
function convertType(type)
{
	if (type == 1)
		return "Sale";
	else if(type == 2)
		return "Return";
	else
		return "Unknown";
}

// Sort by the index. To use, insert this function call into the sort argument for an array.
// Then it will sort by the value at the index.
function sortBy(index) 
{
	return function(first, second)
	{
		return ((first[index] < b[index]) ? -1 : ((first[index] > second[index]) ? 1 : 0));
	}
};

// Returns true if the value is neither null nor undefined. 
function IsNotNullOrUndefined(value)
{
	return !(value === null || value === undefined);
}

function preciseRound(value, decimals)
{
	var val = value * Math.pow(10, decimals);
	var fraction = (Math.round((val-parseInt(val))*10)/10);

	//this line is for consistency with .NET Decimal.Round behavior
	// -342.055 => -342.06
	if(fraction == -0.5)
		fraction = -0.6;

	val = Math.round(parseInt(val) + fraction) / Math.pow(10, decimals);
	return val;
}

function formatDollar(num)
{
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

function convertToObject(string)
{
	var front = string.indexOf('[');
	if (front > -1) {
		var back = string.indexOf(']');
		var outbound = string.substring(front);
		var transactionObject = '{"transactions":' + outbound + '}';
		return JSON.parse(outbound);
	}
	else{
		var index = string.indexOf('{');
		if (index > -1)
		{
			return JSON.parse(string.substring(index));
		}
	}
	return false;
}

// END UTILITY FUNCTTIONS 

// Display functions
function showTransactions(searchResults)
{
	if (searchResults == null)
		return;
	
	var row, cell, displayTable, tableBody, tableHeader;
	displayTable = document.createElement('table');
	displayTable.className = "allTransTable";
	tableBody = document.createElement('tbody');
	row = document.createElement('tr');
	tableHeader = document.createElement('th');
	tableHeader.appendChild(document.createTextNode("Book Store Transactions"));
	tableHeader.setAttribute('colSpan', 8);
	tableHeader.setAttribute('style', 'font-size: 22px;');
	row.appendChild(tableHeader);
	tableBody.appendChild(row);
	// Blank spacer row
	row = document.createElement('tr');
	cell = document.createElement('td');
	cell.setAttribute('colSpan', 8);
	cell.setAttribute('style', 'height: 5px;');
	row.appendChild(cell);
	tableBody.appendChild(row);
	// Sales Report row
	row = document.createElement('tr');
	tableHeader = document.createElement('th');
	tableHeader.appendChild(document.createTextNode("Transaction Report"));
	tableHeader.setAttribute('colSpan', 8);
	tableHeader.setAttribute('style', 'font-size: 18px;');
	row.appendChild(tableHeader);
	tableBody.appendChild(row);
	// Blank spacer row
	row = document.createElement('tr');
	tableHeader = document.createElement('td');
	tableHeader.setAttribute('colSpan', 8);
	tableHeader.setAttribute('style', 'height: 5px;');
	row.appendChild(tableHeader);
	tableBody.appendChild(row);
	// Lay out the columns. Transaction columns and book id and title
	row = document.createElement('tr');
	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("#"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("ID"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Date"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Type"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Price"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Qty"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("ISBN"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Title"));
	row.appendChild(columnName);
	tableBody.appendChild(row);

	var count = 0;
	
	for (item in searchResults)
	{
		row = document.createElement('tr');
		var transaction = searchResults[item];
		var title = getBookTitleByISBN(transaction.BOOKID); // To be displayed in each line

		if (title != undefined)
		{
			var data = new Array(++count, transaction.ID, transaction.DATE, convertType(transaction.TYPE), transaction.PRICE, transaction.QTY, transaction.BOOKID, title);

			for (var index = 0; index < 8; index++)
			{
				cell = document.createElement('td');
				cellText = document.createTextNode(data[index]);
				// Right align prices and quantities
				if (index == 4 || index == 5)
					cell.setAttribute('style', 'text-align: right;');
				else
					cell.setAttribute('style', 'text-align: left;');
					
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			tableBody.appendChild(row);
		}
	}
	displayTable.appendChild(tableBody);
	transactionResult.appendChild(displayTable);
}

function showAccountingResults(startDate, endDate, searchPoint, searchResults)
{
	clearDisplayTable();
	if (searchResults == null)
		return;
	 
	var row, cell, displayTable, tableHeader, tableTitle, columnName;
	// Build the display table	
	displayTable = document.createElement('table');
	displayTable.className = 'transTable';
	tableBody = document.createElement('tbody');
	row = document.createElement('tr');
	tableHeader = document.createElement('th');
	tableHeader.setAttribute('colSpan', 4);
	tableHeader.setAttribute('style', 'font-size: 22px; margin-left: 15px;');
	tableHeader.appendChild(document.createTextNode("Book Store Accounting"));
	row.appendChild(tableHeader);
	tableBody.appendChild(row);
	// Blank spacer row
	row = document.createElement('tr');
	tableHeader = document.createElement('th');
	tableHeader.setAttribute('colSpan', 4);
	tableHeader.setAttribute('style', 'height: 5px;');
	row.appendChild(tableHeader);
	tableBody.appendChild(row);
	// Sales Report row
	row = document.createElement('tr');
	tableHeader = document.createElement('th');
	tableHeader.appendChild(document.createTextNode("Sales Report"));
	tableHeader.setAttribute('colSpan', 4);
	tableHeader.setAttribute('style', 'font-size: 18px;');
	row.appendChild(tableHeader);
	tableBody.appendChild(row);
	// Dates row
	row = document.createElement('tr');
	cell = document.createElement('td');
	cell.setAttribute('colSpan', 4);
	cell.appendChild(document.createTextNode("From: " + startDate + " -- " + "To: " + endDate));
	cell.setAttribute('style', 'text-align: center;');
	row.appendChild(cell);
	tableBody.appendChild(row);
	// Blank spacer row
	row = document.createElement('tr');
	tableHeader = document.createElement('td');
	tableHeader.setAttribute('colSpan', 4);
	tableHeader.setAttribute('style', 'height: 5px;');
	row.appendChild(tableHeader);
	tableBody.appendChild(row);

	// Data row columns
	row = document.createElement('tr');
	columnName = document.createElement('td');
	//columnName.setAttribute('width', 35);
	columnName.appendChild(document.createTextNode("#"));
	row.appendChild(columnName);

	columnName = document.createElement('td');
	columnName.appendChild(document.createTextNode(searchPoint));
	row.appendChild(columnName);

	columnName = document.createElement('td');
	columnName.setAttribute('width', 40);
	columnName.appendChild(document.createTextNode("Copies"));
	row.appendChild(columnName);

	columnName = document.createElement('td');
	columnName.setAttribute('width', 65);
	columnName.appendChild(document.createTextNode("Profit"));
	row.appendChild(columnName);
	tableBody.appendChild(row);

	var count = 1;
	// Rows
	for (sr in searchResults)
	{
		var item = searchResults[sr];
		row = document.createElement('tr');
	 
		for (index = 0; index < 4; index++)
		{
			cell = document.createElement('td');
			switch (index)
			{
			case 0:
				cellText = document.createTextNode(count);
				break;
			case 1:
				cellText = document.createTextNode(item[0]);
				break;
			case 2: 
				cellText = document.createTextNode(item[1]);
				cell.setAttribute('style', 'text-align: center;');
				break;
			case 3:
				var value = Number(item[2]); 
				cellText = document.createTextNode(formatDollar(value));
				cell.setAttribute('style', 'text-align: left;');
				break;
			}
			 
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		count++;
		tableBody.appendChild(row);
	}
	displayTable.appendChild(tableBody);
	transactionResults.appendChild(displayTable);
}
