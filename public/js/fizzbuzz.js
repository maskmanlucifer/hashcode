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