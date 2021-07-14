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

const fizz = document.querySelector('#fizz');
const stl = document.querySelector('#stl');
const buzz = document.querySelector('#buzz');

$('#fizz').click(()=>{
    window.location.replace("http://localhost:3000/fizz");
})

$('#buzz').click(()=>{
    window.location.replace("http://localhost:3000/buzz");
})

$('#stl').click(()=>{
    window.location.replace("http://localhost:3000/stl");
})

