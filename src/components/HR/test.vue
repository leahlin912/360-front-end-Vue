<template>
    <div id="app">
        <div id="content">
            <canvas ref="chart"></canvas>
        </div>
        <div class="chart">
            <canvas id="ordersChart" class="chart-canvas"></canvas>
        </div>
        <div class="chart">
            <canvas id="devicesChart" class="chart-canvas"></canvas>
        </div>
    </div>
    
</template>

<script>
    import Chart from 'chart.js';

    export default {
        name: 'test',
        mounted() {
            var chart = this.$refs.chart;
            var ctx = chart.getContext("2d");
            var ordersChart = new Chart('ordersChart', {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                    label: 'Sales',
                    data: [25,20,30,22,17],
                    backgroundColor: [
                            '#2C7BE5','#2C7BE5','#2C7BE5','#2C7BE5','#2C7BE5'
                        ],
                    }]
                }
            });
            new Chart('devicesChart', {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Tablet', 'Mobile'],
                    datasets: [{
                    data: [60, 25, 15]
                    }]
                }
            });
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            // 'rgba(255, 99, 132, 0.2)',
                            '#2C7BE5',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            '#2C7BE5',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>