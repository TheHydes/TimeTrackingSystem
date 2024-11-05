<template>
    <div class="chart-container">
      <BarChart :chartData="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  // Register necessary chart.js components
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    components: {
      BarChart: Bar
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    computed: {
      chartData() {
        return {
          labels: Object.keys(this.data), // Címkék (pl. "Projekt", "Ügyfél")
          datasets: [
            {
              label: 'Összes munkaidő (óra)',
              data: Object.values(this.data).map(item => parseFloat(item.duration)),
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        }
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Címkék szerinti összesített munkaidő'
            },
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Munkaidő: ${context.raw} óra`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Munkaidő (óra)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Címkék'
              }
            }
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    max-width: 400px;
    max-height: 400px;
    margin: auto;
  }
  </style>
  