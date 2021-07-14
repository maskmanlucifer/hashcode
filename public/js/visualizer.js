
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

$.get('http://localhost:3000/load',(data,status)=>{
    console.log(status);
    var ctx = document.getElementById('myChart1').getContext('2d');
    Chart.defaults.font.size = 18;
    Chart.defaults.color = '#F1C40F';
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['NEWBIE', 'PUPIL', 'SPECIALIST', 'EXPERT', 'CM', 'MASTER','IM','GM','IGM','LGM'],
            datasets: [{
                label: '# OF USERS',
                data: data.nerdCount,
                backgroundColor: [
                    'rgb(128 , 128 , 128 , 0.3)',
                    'rgba(58, 235, 52, 0.3)',
                    'rgba(31, 242, 235, 0.3)',
                    'rgba(14, 44, 240, 0.3)',
                    'rgba(245, 37, 221, 0.3)',
                    'rgba(245, 227, 37, 0.3)',
                    'rgba(245, 190, 37, 0.7)',
                    'rgba(232, 43, 26, 0.2)',
                    'rgba(232, 43, 26, 0.4)',
                    'rgba(191, 26, 11, 0.7)'
                ],
                borderColor: [
                'rgb(128 , 128 , 128 , 0.6)',
                'rgba(58, 235, 52, 0.6)',
                'rgba(31, 242, 235, 0.6)',
                'rgba(14, 44, 240, 0.6)',
                'rgba(245, 37, 221, 0.6)',
                'rgba(245, 227, 37, 0.6)',
                'rgba(245, 190, 37, 1)',
                'rgba(232, 43, 26, 0.5)',
                'rgba(232, 43, 26, 0.7)',
                'rgba(191, 26, 11, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4,
                
            }]
        },
        options: {
            
            plugins: {
                title: {
                    display: true,
                    text: 'NUMBER OF USERS IN EACH LEVEL',
                    color:'#F1C40F'
                },
                legend: {
                    display: true,
                    labels: {
                        color: '#F1C40F'
                    }
                }
            }
        }
    });
    
    var ctx = document.getElementById('myChart2').getContext('2d');
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#F1C40F';
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['NEWBIE', 'PUPIL', 'SPECIALIST', 'EXPERT', 'CM', 'MASTER','IM','GM','IGM','LGM'],
            datasets: [{
                label: '# OF USERS',
                data: data.problemCount,
                backgroundColor: [
                    'rgb(128 , 128 , 128 , 0.3)',
                    'rgba(58, 235, 52, 0.3)',
                    'rgba(31, 242, 235, 0.3)',
                    'rgba(14, 44, 240, 0.3)',
                    'rgba(245, 37, 221, 0.3)',
                    'rgba(245, 227, 37, 0.3)',
                    'rgba(245, 190, 37, 0.7)',
                    'rgba(232, 43, 26, 0.2)',
                    'rgba(232, 43, 26, 0.4)',
                    'rgba(191, 26, 11, 0.7)'
                ],
                borderColor: [
                'rgb(128 , 128 , 128 , 0.6)',
                'rgba(58, 235, 52, 0.6)',
                'rgba(31, 242, 235, 0.6)',
                'rgba(14, 44, 240, 0.6)',
                'rgba(245, 37, 221, 0.6)',
                'rgba(245, 227, 37, 0.6)',
                'rgba(245, 190, 37, 1)',
                'rgba(232, 43, 26, 0.5)',
                'rgba(232, 43, 26, 0.7)',
                'rgba(191, 26, 11, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4,
                
            }]
        },
        options: {
            
            plugins: {
                title: {
                    display: true,
                    text: 'NUMBER OF USERS IN EACH LEVEL',
                    color:'#F1C40F'
                },
                legend: {
                    display: true,
                    labels: {
                        color: '#F1C40F'
                    }
                }
            }
        }
    });
    
    var ctx = document.getElementById('myChart3').getContext('2d');
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#F1C40F';
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['NEWBIE', 'PUPIL', 'SPECIALIST', 'EXPERT', 'CM', 'MASTER','IM','GM','IGM','LGM'],
            datasets: [{
                label: '# OF USERS',
                data: data.contestCount,
                backgroundColor: [
                    'rgb(128 , 128 , 128 , 0.3)',
                    'rgba(58, 235, 52, 0.3)',
                    'rgba(31, 242, 235, 0.3)',
                    'rgba(14, 44, 240, 0.3)',
                    'rgba(245, 37, 221, 0.3)',
                    'rgba(245, 227, 37, 0.3)',
                    'rgba(245, 190, 37, 0.7)',
                    'rgba(232, 43, 26, 0.2)',
                    'rgba(232, 43, 26, 0.4)',
                    'rgba(191, 26, 11, 0.7)'
                ],
                borderColor: [
                'rgb(128 , 128 , 128 , 0.6)',
                'rgba(58, 235, 52, 0.6)',
                'rgba(31, 242, 235, 0.6)',
                'rgba(14, 44, 240, 0.6)',
                'rgba(245, 37, 221, 0.6)',
                'rgba(245, 227, 37, 0.6)',
                'rgba(245, 190, 37, 1)',
                'rgba(232, 43, 26, 0.5)',
                'rgba(232, 43, 26, 0.7)',
                'rgba(191, 26, 11, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4,
                
            }]
        },
        options: {
            
            plugins: {
                title: {
                    display: true,
                    text: 'NUMBER OF USERS IN EACH LEVEL',
                    color:'#F1C40F'
                },
                legend: {
                    display: true,
                    labels: {
                        color: '#F1C40F'
                    }
                }
            }
        }
    });
})
