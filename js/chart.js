
        var ctx = document.getElementById('chartCanvas').getContext('2d');
        var s="";
        var data={
         labels:[""],
         datasets:[
             {
                 label:"person1",
                 data:[0.8],
                 backgroundColor:[
                    "#7f5fcb",
                 ],
                 
                 borderColor:[
                    "#7f5fcb",
                 ],
                //  borderWidth:1,
                
                 
             },
             
             {
                label:"person2",
                data:[0.3,0.6],
                backgroundColor:[
                    "#313153",
                    
                ],
                
                borderColor:[
                    "#313153",

                ],
                // borderWidth:1,
                
               
            }
         ]
        };

        var options={
            title:{
                display:true,
                position:"top",
                text:" 2020 SH.A Student Union Elections",
                fontSize:18,
                fontColor:"#111"
            },
    
            legend:{
                display:true,
                position:"bottom",
                labels: {
                fontColor:"red",
                // padding:100
                }
            },

            scales:{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:1.0,
                        stepSize:0.2
                    }

                }],

                xAxes: [{
                    categoryPercentage: 0.5,
                     barPercentage: 0.5
                }],

                // scaleOverride : true,
                // scaleSteps : 0.2,
                // scaleStepWidth : 50,
                // scaleStartValue : 0 
                // barThickness:15
            }


            
    
           };

        var chart=new Chart(ctx,{
            type:"bar",
            data:data,
            options:options,
            
        
        });
    
        // window.onload = function(){
        //     var ctx = document.getElementById("chartCanvas").getContext("2d");
        //     window.myLine = new Chart(ctx).Line(lineChartData, {
        //         scaleOverride : true,
        //         scaleSteps : 10,
        //         scaleStepWidth : 50,
        //         scaleStartValue : 0 
        //     });
        // }