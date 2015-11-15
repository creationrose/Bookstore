<?php
	$connect = mysqli_connect('localhost', 'root', 'usbw', 'bookstore');
	if (mysqli_connect_errno())
		die("Could not connect to db " . mysql_error());
	else
	{
		dropTable($connect, "transactions");
		createTransactionsTable($connect);
		
		echo "Starting\n\n";
		$transactions = array();
		$pieces = explode('^', file_get_contents('data/transactions.data'));
		foreach($pieces as $each)
		{
			$transaction = explode('|', $each);
			array_push($transactions, $transaction);
		}
		
		foreach($transactions as $item)
		{
			$sql = "insert into transactions(DATE, TYPE, PRICE, BOOKID, QTY) values";
			$sql .= "(" . $item[0] . "," . $item[1] . "," . $item[2] . "," . $item[3] . "," . $item[4] . ")";
			echo "BookId : " . $item[3] . "\n";
			insertTransaction($connect, $sql);
		}
	}
	echo "Finished";
	mysqli_close($connect);

	//	Functions
	function insertTransaction($connection, $sql)
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
	function createTransactionsTable($connection)
	{
		$sql = "CREATE TABLE IF NOT EXISTS `transactions` (
		`ID` int(10) NOT NULL AUTO_INCREMENT,
		`DATE` date NOT NULL,
		`TYPE` int(2) NOT NULL,
		`PRICE` float NOT NULL,
		`BOOKID` bigint(24) NOT NULL,
		`QTY` int(10) NOT NULL,
		PRIMARY KEY (`ID`)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
		mysqli_query($connection, $sql);
	}
?>
