let url = "https://codeforces.com/api/";

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



$('#submit').click(function(e){
  e.preventDefault();

  let handle = $('#handle').val().trim();
  let level = $('select option:selected').val();
  console.log(level,handle);

});


});