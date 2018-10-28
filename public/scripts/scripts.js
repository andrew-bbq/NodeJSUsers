function create_new_user() {
    console.log("Button was pressed");
    $.ajax({
        type: "POST",
        url: '/create_user',
        data: {'data': 1, 'data2': 123, 'array1': [1, 2, 3]},
      });
}

function displayLogin() {
    $(".register-body").hide();
    $(".login-body").show();
    $("#register-link").removeClass("active");
    $("#login-link").addClass("active");
}

function displayRegister() {
    $(".login-body").hide();
    $(".register-body").show();
    $("#register-link").addClass("active");
    $("#login-link").removeClass("active");
}
