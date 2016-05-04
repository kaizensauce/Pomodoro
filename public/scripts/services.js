define(["jquery"], function($) {
   function saveStatusUpdate(status) {
       $.ajax({
      url: "/api/comments",
      dataType: 'json',
      type: 'POST',
      data: status
    });
    }

    return {
    SaveStatusUpdate : saveStatusUpdate
  }; 
});