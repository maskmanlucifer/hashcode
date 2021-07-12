$('#dark').click(function() {
    $(':root').css({
        "--text-primary": "#b6b6b6",
        "--text-secondary":"#ececec",
        "--bg-primary":"#23232e",
        "--bg-secondary":"#141418"
    }); 
});

$('#light').click(function() {
    console.log("me");
    $(':root').css({
        "--text-primary": "#576e75",
        "--text-secondary": "#35535c",
        "--bg-primary": "#fdf6e3",
        "--bg-secondary": "#f8e1a3"
    }); 
});