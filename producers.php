<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    exit('Only GET is supported.');
}

$fullName = !empty($_GET['name']) ? $_GET['name'] : '';
if ($fullName === '') {
    exit('Parameter is not set.');
}

$curDirPath = dirname(__FILE__);
require("$curDirPath/../defines.php");
require_once("$curDirPath/../../../includes/config.inc.php");
require(MYSQL);

$sqlFullName = mysqli_real_escape_string($dbc, $fullName);
$result = mysqli_query($dbc, "CALL get_producer_detail('$sqlFullName')");
if ($result !== FALSE)
{
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
    mysqli_free_result($result);
}

?>

