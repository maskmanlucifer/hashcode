$(document).ready(function() {
// theme change implementation
const themeMap = {
    dark: "light",
    light: "dark",
};
  
const theme = localStorage.getItem('theme') || (tmp = Object.keys(themeMap)[0],localStorage.setItem('theme', tmp),tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
   
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
}

$(".theme-icon").click(function(e){
    e.preventDefault();
    toggleTheme();
});

$("#fizz").click(function(e){
    e.preventDefault();
    $("#stl").removeClass('active');
    $("#buzz").removeClass('active');
    $("#fizz").addClass('active');
    $(".fizz").removeClass('notshow');
    $(".stl").addClass('notshow');
    $(".buzz").addClass('notshow');
});

$("#stl").click(function(e){
    e.preventDefault();
    $("#buzz").removeClass('active');
    $("#fizz").removeClass('active');
    $("#stl").addClass('active');
    $(".stl").removeClass('notshow');
    $(".fizz").addClass('notshow');
    $(".buzz").addClass('notshow');
});

$("#buzz").click(function(e){
    e.preventDefault();
    $("#stl").removeClass('active');
    $("#fizz").removeClass('active');
    $("#buzz").addClass('active');
    $(".buzz").removeClass('notshow');
    $(".stl").addClass('notshow');
    $(".fizz").addClass('notshow');
});


});