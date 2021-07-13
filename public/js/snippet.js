
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

$("#general").click(function(e){
    e.preventDefault();
    $("#stl").removeClass('active');
    $("#buzz").removeClass('active');
    $("#general").addClass('active');
    $(".general").removeClass('notshow');
    $(".stl").addClass('notshow');
    $(".buzz").addClass('notshow');
});

$("#stl").click(function(e){
    e.preventDefault();
    $("#buzz").removeClass('active');
    $("#general").removeClass('active');
    $("#stl").addClass('active');
    $(".stl").removeClass('notshow');
    $(".general").addClass('notshow');
    $(".buzz").addClass('notshow');
});

$("#buzz").click(function(e){
    e.preventDefault();
    $("#stl").removeClass('active');
    $("#general").removeClass('active');
    $("#buzz").addClass('active');
    $(".buzz").removeClass('notshow');
    $(".stl").addClass('notshow');
    $(".general").addClass('notshow');
});