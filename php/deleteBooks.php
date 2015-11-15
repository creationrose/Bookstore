<?php
	$connect = mysqli_connect('localhost', 'root', 'usbw', 'bookstore');
	if (mysqli_connect_errno())
		die("Could not connect to db " . mysql_error());
	else
	{
		dropTable($connect, "books");
		createBooksTable($connect);
	}
	mysqli_close($connect);

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