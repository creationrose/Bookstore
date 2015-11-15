Modifications to get working on my system:

When downloading original USB server bookstore file to a MAC,

Drop the 'root' folder files into `htdocs` folder in MAMP



(Change Line 2 in accessBooks.php)

MAMP

```javascript

$connect = mysqli_connect('localhost', 'root', 'root', 'bookstore');

```

USB Webserver

```javascript

$connect = mysqli_connect('localhost', 'root', 'usbw', 'bookstore');

```



(Line 142 in accessBooks.php)

original:

```javascript

return json_encode($books);

```

changed to:

```javascript

return json_encode(utf8ize($books));

```



IMPORT ```localhost.sql``` (database data) to mamp sever

1. Go to http://localhost:<port>/phpmyadmin  (http://localhost:8888/phpmyadmin)
2. Click on mysql on left
3. Click import from the top row of links on the main page.
4. select file from your computer to upload.
