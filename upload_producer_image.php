<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../photo_upload/imgutils_core.php");
require_once("$curDirPath/../../../producers/functions.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Only POST is supported.');
}

if (!is_array($_FILES) || !isset($_FILES['producerImages']['tmp_name'])) {
    exit('Uploaded files are invalid.');
}

function getProducerDirectoryUri($country, $region, $district, $village, $shortName)
{
    $country = trim($country);
    $region  = trim($region);

    $strParentDir =
        '../../../producers/' .
        generateFolderName($country, $country) . '/' .
        generateFolderName($region, $country)  . '/';

    if ($district != '')
    {
        $district      = trim($district);
        $strParentDir .= generateFolderName($district, $country) . '/';
    }

    if ($village != '')
    {
        $village       = trim($village);
        $strParentDir .= generateFolderName($village, $country) . '/';
    }

    return ($strParentDir . generateFolderName($shortName, $country));
}

if (is_uploaded_file($_FILES['producerImages']['tmp_name'])) {
    $sourcePath = $_FILES['producerImages']['tmp_name'];
    $fileName   = generateFolderName($_POST['name'], 'France') . '-' . $_POST['index'] . '.jpg';
    $targetPath = getProducerDirectoryUri(
        $_POST['country'],
        $_POST['region'],
        $_POST['district'],
        $_POST['village'],
        $_POST['name']) . '/' . $fileName;

    if (isSupportedExtension($fileName) &&
        move_uploaded_file($sourcePath, $targetPath)) {
        echo $fileName;
    } else {
        echo "Failed to upload $fileName<br />";
    }
} else {
    echo 'Failed to upload the image.<br />';
}

?>
