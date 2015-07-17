/**
 * Created by alex on 14-10-16.
 */

function drawChart(url, color) {
    showMask();
    $.ajax({
        url: url,
        dataType: "text",
        type: "get",
        success: function (response) {
            //hideMask();
            $("#imgDiv").css("display", "none");
            if (url.indexOf("KpiDataMapshowServlet") > -1)
                callback_map(response);
            else
                callback_chart(response);
        },
        error: function () {
            //hideMask();
            if (url.indexOf("KpiTrendDataServlet") == -1)
                $("#imgDiv").css("display", "");
        }
    });
}

var callback_map = function (response) {
    var data = JSON.parse(response);
    var kpiName = data[0]["KPI_NAME"];
    var unit = data[0]["UNIT"];
    var min = data[data.length - 1]['value'];
    var max = data[1]['value'];
    var option = {
        title: {
            text: kpiName,
            subtext: '单位：' + unit,
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        dataRange: {
            min: min,
            max: max,
            x: 'right',
            y: 'bottom',
            text: [max, min],           // 文本，默认为数值文本
            calculable: false,
            splitNumber:0
        },
        series: [
            {
                name: kpiName,
                type: 'map',
                mapType: 'china',
                roam: false,
                selectedMode:'single',
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: data.slice(1)
            }
        ]
    };
    var chartArea = document.getElementById('chartArea');
    chartArea.style.width = "100%";
    chartArea.style.height = "100%";
    var myChart = echarts.init(document.getElementById('chartArea'));
    myChart.setOption(option);
}

var callback_chart = function (response) {
    var data = response;
    var index = data.indexOf("\n");
    var chartType = data.slice(0, index);
    var xmlData = data.slice(index + 1);
    // 绘制图表
    FusionCharts.setCurrentRenderer("javascript");
    if (color)
        var chart = new FusionCharts(chartType, "ChartId", "100%", "100%", "0", "1", color);
    else
        var chart = new FusionCharts(chartType, "ChartId", "100%", "100%", "0", "1");
    chart.configure("LoadingText", "");
    chart.setDataXML(xmlData);
    chart.setChartAttribute('formatNumberScale', '1');
    chart.setChartAttribute('decimals', '1');
    chart.render("chartArea");
};