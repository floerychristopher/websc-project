<?php

  class Appointment
  {
      public $id;
      public $title;
      public $location;
      public $date;
      public $startTime;
      public $endTime;
      //Constructor of Appointment Class
      function __construct($id, $title, $location, $date, $startTime, $endTime)
      {
          $this->id = $id;
          $this->title = $title;
          $this->location = $location;
          $this->date = $date;
          $this->startTime = $startTime;
          $this->endTime = $endTime;
      }
  }

?>