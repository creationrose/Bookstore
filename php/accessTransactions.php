<?php
	$connect = mysqli_connect('localhost', 'root', 'usbw', 'bookstore');
	if (!$connect)
		die("Could not connect to db " . mysql_error());
	else
	{
		$funcName = $_GET['func'];
		$transactions = "";
		switch ($funcName)
		{
			case 'getAllTransactions':
				$transactions = getAllTransactions($connect);
				break;
			
			default:
				$transactions = getAllTransactions($connect);
				break;
		}
		
		mysqli_close($connect);
		echo $transactions;
	}
	
	// Functions
	function getAllTransactions($con)
	{
		$sql = "select * from transactions";
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
	
	function execGetMultiple($con, $sql)
	{
		$transactions = array();
		if ($result = mysqli_query($con, $sql))
		{
			while ($row = mysqli_fetch_assoc($result))
				$transactions[] = $row;
		}
		return json_encode($transactions);
	}

?>