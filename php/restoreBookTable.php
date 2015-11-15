<?php
	$connect = mysqli_connect('localhost', 'root', 'usbw', 'bookstore');
	if (mysqli_connect_errno())
		die("Could not connect to db " . mysql_error());
	else
	{
		dropTable($connect, "books");
		createBooksTable($connect);
	
		echo "Starting\n\n";
		$books = array();
		$pieces = explode('^', file_get_contents('data/books.data'));
		foreach($pieces as $each)
		{
			$book = explode('|', $each);
			array_push($books, $book);
		}
	
		foreach($books as $item)
		{
			$sql = "insert into books(ISBN, TITLE, AUTHOR, PUBLISHER, WS_PRICE, RET_PRICE, QUANTITY) values";
			$sql .= "(" . $item[0] . "," . $item[1] . "," . $item[2] . "," . $item[3] . "," . $item[4] . " ," . $item[5] . "," . $item[6] .")";
			echo $item[0] . " : " . $item[1] . "\n";
			insertBook($connect, $sql);
		}
	}
	echo "Finished";
	mysqli_close($connect);
	
//	Functions
	function insertBook($connection, $sql)
	{
		$responses = 0;
		$response = mysqli_query($connection, $sql);
		if ($response === false)
			echo sprintf("error: %s\n", mysqli_error($connection));
	}
	
	function dropTable($connection, $tableName)
	{
		$sql = "DROP TABLE " . $tableName;
		mysqli_query($connection, $sql);
	}
	
	// Don't forget that isbn must be bigint instead of int to accommodate the large numbers
	function createBooksTable($connection)
	{
		$sql = "CREATE TABLE IF NOT EXISTS `books`
		(
			`ISBN` bigint(24) NOT NULL,
			`TITLE` varchar(64) NOT NULL,
			`AUTHOR` varchar(64) NOT NULL,
			`PUBLISHER` varchar(64) NOT NULL,
			`WS_PRICE` float NOT NULL,
			`RET_PRICE` float NOT NULL,
			`QUANTITY` int(8) NOT NULL,
			PRIMARY KEY (`ISBN`),
			UNIQUE KEY `ISBN` (`ISBN`)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
		mysqli_query($connection, $sql);
	}
?>