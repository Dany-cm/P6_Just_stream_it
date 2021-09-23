let ajaxcall = new XMLHttpRequest();

ajaxcall.open("POST", "path/to/api", true);
ajaxcall.onreadystatechange = function () {
    if (ajaxcall.readyState != 4 || ajaxcall.status != 200)
        return;
    alert("Success: " + ajaxcall.responseText);
};
ajaxcall.send("banana=yellow");