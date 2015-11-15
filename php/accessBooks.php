<?php
	$connect = mysqli_connect('localhost', 'root', 'root', 'bookstore');
	if (!$connect)
		die("Could not connect to db " . mysql_error());
	else
	{
		$funcName = $_GET['func'];
		$result = "";
		switch ($funcName)
		{
			case 'getAllBooks':
				$result = getAllBooks();
				break;
			case 'getBookByIsbn':
				$isbn = $_GET['isbn'];
				$result = getBookByIsbn($connect, $isbn);
				break;
			case 'getBookByTitle':
				$title = $_GET['title'];
				$result = getBookByTitle($connect, $title);
				break;
			case 'getBooksByAuthor':
				$author = $_GET['author'];
				$result = getBooksByAuthor($connect, $author);
				break;
			case 'getBooksByPublisher':
				$publisher = $_GET['publisher'];
				$result = getBooksByPublisher($connect, $publisher);
				break;
			case 'getBooksUsingKeywords':
				$wordString = $_GET['words'];
				$keyWords = array();
				if (strpos($wordString, ',') != false)
					$keyWords = explode(',', $wordString);
				else
					array_push($keyWords, $wordString);

				$param = $_GET['param'];
				$result = getBooksByKeywords($connect, $keyWords, $param);
				break;
			case 'getAuthors':
				$result = getAuthors($connect);
				break;
			case 'getPublishers':
				$result = getPublishers($connect);
				break;
			default:
				$result = getAllBooks($connect);
				break;
		}

		mysqli_close($connect);
		echo $result;
	}

	function getAuthors($con)
	{
		$sql = "select DISTINCT AUTHOR from books ORDER BY AUTHOR";
		return execGetMultiple($con, $sql);
	}

	function getPublishers($con)
	{
		$sql = "select DISTINCT PUBLISHER from books ORDER BY PUBLISHER";
		return execGetMultiple($con, $sql);
	}

	function getAllBooks($con)
	{
		$sql = "select * from books";
		return execGetMultiple($con, $sql);
	}

	function getBookByIsbn($con, $isbn)
	{
		$sql = "select * from books where ISBN = " . $isbn;
		return execGetSingle($con, $sql);
	}

	function getBookByTitle($con, $title)
	{
		$sql = "select * from books where TITLE LIKE '" . $title . "'";
		return execGetSingle($con, $sql);
	}

	function getBooksByAuthor($con, $authorName)
	{
		$sql = "select * from books where AUTHOR LIKE '" . $authorName . "'";
		return execGetMultiple($con, $sql);
	}

	function getBooksByPublisher($con, $publisherName)
	{
		$sql = "select * from books where PUBLISHER LIKE '" . $publisherName . "'";
		return execGetMultiple($con, $sql);
	}

	function getBooksByKeywords($con, $keyWords, $param)
	{
		$sql = "select * from books where " . $param . " REGEXP '[[:<:]]";
		$count = 1;
		foreach ($keyWords as $word)
		{
			if ($count == 1)
				$sql .= $word . "[[:>:]]'";
			else if ($count > 1)
				$sql .= " OR " . $param . " REGEXP '[[:<:]]" . $word . "[[:>:]]'";
			$count++;
		}
		return execGetMultiple($con, $sql);
	}

	function execGetSingle($con, $sql)
	{
		if ($result = mysqli_query($con, $sql))
		{
			if ($result != false)
				return json_encode(mysqli_fetch_assoc($result));
		}
	}

	function utf8ize($d) {
	    if (is_array($d)) {
	        foreach ($d as $k => $v) {
	            $d[$k] = utf8ize($v);
	        }
	    } else if (is_string ($d)) {
	        return utf8_encode($d);
	    }
	    return $d;
	}

	function execGetMultiple($con, $sql)
	{
		$books = array();
		if ($result = mysqli_query($con, $sql))
		{
			while ($row = mysqli_fetch_assoc($result)) {
				array_push($books, $row);
			}
		}
		return json_encode(utf8ize($books));
	}
?>