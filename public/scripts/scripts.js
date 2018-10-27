function create_new_user(){
    console.log("Button was pressed");
    $.ajax({
        type: "POST",
        url: '/create_user',
        data: {'data': 1, 'data2': 123, 'array1': [1, 2, 3]},
      });
}