// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["3bf5ce32", "422c6758", "d66d829c", "7e243418", "69c3479a", "53bd031a",
    "b43a9a49", "d58fe78a", "9d6aa1ac"],
    datasets: [{
      label: "400",
      backgroundColor: "#268cde",
      borderColor: "rgba(2,117,216,1)",
      data: [14, 12, 4, 8, 12, 10, 5, 2, 10],
    
    //   options: {
    //     parsing: {
    //         key: 'nested.value'
    //     }
    // }
    },
    // {
    //   label: "404",
    //   backgroundColor: "#0d6efd",
    //   borderColor: "rgba(2,117,216,1)",
    //   data: [14, 12, 5, 8, 12, 10, 5, 2, 10],
    // },
    // {
    //   label: "500",
    //   backgroundColor: "#dc3545",
    //   borderColor: "rgba(2,117,216,1)",
    //   data: [14, 12, 5, 8, 12, 10, 5, 2, 10],
    // }
  ],
  },
    options: {
      parsing: {
        xAxisKey: 'id',
        yAxisKey: 'nested.value'
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Sequence ID'
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 16,
        },
        gridLines: {
          display: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Sequence Length'
        }
      }],
    },
    legend: {
      display: true,
      position: "right"
    }
  }
});
