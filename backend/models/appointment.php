<?php

  class Appointment
  {
      public $id;
      public $title;
      public $location;
      public $date;
      public $expirationDate;
      public $duration;
      public $description;
      //Constructor of Appointment Class
      function __construct($id, $title, $location, $date, $expirationDate, $duration, $description)
      {
          $this->id = $id;
          $this->title = $title;
          $this->location = $location;
          $this->date = $date;
          $this->expirationDate = $expirationDate;
          $this->duration = $duration;
          $this->description = $description;
      }
  }

?>