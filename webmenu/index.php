<!DOCTYPE html>
<html>

<body>
  <?php
  echo "PHP vous dit bonjour ! ";

  $now = new DateTime();
  $now->setTimezone(new DateTimeZone('Europe/Zurich'));
  echo "Il est " . $now->format("H:i:s");

  echo "<br>";
  echo "----------------";
  echo "<br>";
  try {
    //local
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=menu_display;charset=utf8', 'root', '');
    echo "connexion OK";
  } catch (PDOException $e) {
    echo "Erreur !: " . $e->getMessage() . "<br/>";
    die();
  }
  ?>
</body>

</html>