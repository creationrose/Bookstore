// JavaScript functions for BookStore Book access
// Lee Middleton
// Portland Community College
// CIS 122

function reloadBooks()
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: reloadBooks");
		return false;
	}
	else {
		request.open("GET", "../php/restoreBookTable.php", false);
		request.send();
		return request.responseText;
	}
}

function deleteAllBooks()
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: deleteAllBooks");
		return false;
	}
	else {
		request.open("GET", "../php/deleteBooks.php", false);
		request.send();
		return request.responseText;
	}
}

function convertToObject(string)
{
	var front = string.indexOf('[');
	if (front > -1)
	{
		var back = string.indexOf(']');
		var outbound = string.substring(front);
		//var bookObject = '{"books":' + outbound + '}';
		return JSON.parse(outbound);
	}
	else
	{
		var index = string.indexOf('{');
		if (index > -1)
		{
			return JSON.parse(string.substring(index));
		}
	}
	return false;
}

function convertToArray(string)
{
	return JSON.parse(string);
}

function getAllBooks()
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: getAllBooks");
		return false;
	}
	else {
		request.open("GET", "../php/accessBooks.php", false);
		request.send(null);
		return convertToObject(request.responseText);
	}
}

function getBookByIsbn(isbn)
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: getBookByIsbn");
		return false;
	}
	else {
		request.open("GET", "../php/accessBooks.php?func=getBookByIsbn&isbn=" + isbn, false);
		request.send(null);
		return convertToObject(request.responseText);
	}
}

function getBookByTitle(titleText)
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: getBookByTitle");
		return false;
	}
	else {
		request.open("GET", "../php/accessBooks.php?func=getBookByTitle&title=" + titleText, false);
		request.send(null);
		return convertToObject(request.responseText);
	}
}

function getBooksByAuthor(authorName)
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: getBooksByAuthor");
		return false;
	}
	else {
		request.open("GET", "../php/accessBooks.php?func=getBooksByAuthor&author=" + authorName, false);
		request.send(null);
		return convertToObject(request.responseText);
	}
}

function getBooksByPublisher(publisherName)
{
	var request = new XMLHttpRequest();
	if (!request) {
		alert("Bad AJAX request: getBooksByPublisher");
		return false;
	}
	else {
		request.open("GET", "../php/accessBooks.php?func=getBooksByPublisher&publisher=" + publisherName, false);
		request.send(null);
		return convertToObject(request.responseText);
	}
}

function getBooksUsingKeywords(keyWords, searchParam)
{
	var request = new XMLHttpRequest();
	if (!request)
	{
		alert("Bad AJAX request: getBooksByKeywords");
		return false;
	}
	else
	{
		request.open("GET", "../php/accessBooks.php?func=getBooksUsingKeywords&words=" + keyWords + "&param=" + searchParam, false);
		request.send(null);
		return convertToObject(request.responseText);
	}
}

function getAuthors()
{
	var request = new XMLHttpRequest();
	if (!request)
	{
		alert("Bad AJAX request: getAuthors");
		return false;
	}
	else
	{
		request.open("GET", "../php/accessBooks.php?func=getAuthors", false);
		request.send(null);
		return convertToArray(request.responseText);
	}
}

function getPublishers()
{
	var request = new XMLHttpRequest();
	if (!request)
	{
		alert("Bad AJAX request: getAuthors");
		return false;
	}
	else
	{
		request.open("GET", "../php/accessBooks.php?func=getPublishers", false);
		request.send(null);
		return convertToArray(request.responseText);
	}
}

// Display functions
function showBooks(searchResults)
{
	if (searchResults == null)
		return;
	var row, cell, displayTable, tableHeader, tableTitle;
	displayTable = document.createElement('table');
	displayTable.className = "mytable";
	tableBody = document.createElement('tbody');
	row = document.createElement('tr');
	tableHeader = document.createElement('th');
	tableHeader.appendChild(document.createTextNode("Book Store Inventory"));
	tableHeader.setAttribute('colSpan', 8);
	tableHeader.setAttribute('style', 'font-size: 22px');
	row.appendChild(tableHeader);
	tableBody.appendChild(row);

	row = document.createElement('tr');
	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("#"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Isbn"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Title"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Author"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Publisher"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("W/S"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Retail"));
	row.appendChild(columnName);

	columnName = document.createElement('th');
	columnName.appendChild(document.createTextNode("Qty"));
	row.appendChild(columnName);
	tableBody.appendChild(row);

	var count = 0;
	
	for (b in searchResults)
	{
		row = document.createElement('tr');
		book = searchResults[b];
		var data = new Array(++count, book.ISBN, book.TITLE, book.AUTHOR, book.PUBLISHER, book.WS_PRICE, book.RET_PRICE, book.QUANTITY);
		for (var index = 0; index < 8; index++)
		{
			cell = document.createElement('td');
			cellText = document.createTextNode(data[index]);
			if (index == 0)
				cell.setAttribute('style', 'text-align: right');
			
			cell.appendChild(cellText);
			
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	displayTable.appendChild(tableBody);
	result.appendChild(displayTable);
}
