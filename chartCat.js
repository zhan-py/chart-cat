/////////////////////////2-sides bar chart///////////////////////

Highcharts.Templating.helpers.abs = value => Math.abs(value);
Highcharts.Templating.helpers.multiplyBy100 = value => value*100;

const yellowColor = '#FFCF69';
const blueColor = '#6DB1FA';
const lightGrayColor = '#DEE4EB';

const categories = [
  'Eye fresher', 'Soap', 'Shower get', 'Body lotion', 'Hair conditioner', 'Shampoo', 'Mascara', 'Lip gloss', 'Foundation', 'Eyeliner', 'Eyeshadows', 'Lipstick', 'Rouge', 'Eyebrow pencil', 'Nail polish'
];


Highcharts.chart("twoSidesBarChart", {
  chart: {
    type: 'bar',
  },
  title: {
    text: 'Sales Amounts by Gender: Male vs Female',
  },
  accessibility: {
    point: {
        valueDescriptionFormat: '{index}. {xDescription}, {value}.'
    },
    description: 'Sales Amounts by Gender: Male vs Female',
  },
  plotOptions: {
    series: {
        stacking: 'normal',
        borderRadius: '0%',
        pointWidth: 12,
        borderWidth: 0, 
    }
  },
  series: [{
    name: 'Male',
    data: [-900,-6300,-12600,-10800,-14400,-10080,-900,-1440,-1260,-900,-720,-720,-5040,-1620,-540],
    color: yellowColor
  }, {
    name: 'Female',
    data: [9540,9180,9000,7560,10800,5940,9540,7020,8640,10080,9540,9000,7200,10800,5940],
    color: blueColor
  }],
  xAxis: [{
    categories: categories,
    reversed: false,
    lineWidth: 0 
  }, {
    opposite: true,
    categories: categories, 
    reversed: false,
    linkedTo: 0, 
    lineWidth: 0
  }],
  yAxis: {
    title: {
        text: 'Revenue in Dollars',
        margin: 10
    },
    labels: {
        format: '{abs value}'
    },
    gridLineWidth: 0,
    tickInterval: 6000, 
    lineWidth: 1,
    lineColor: 'gray',
    tickWidth: 0.5,
    tickLength: 5
  },
  tooltip: {
    format: '<b>{series.name}, {point.category}</b><br/>' +
        'Sales: ${(abs point.y)}'
  },
  legend: {
    align: 'center',
    verticalAlign: 'top',
    symbolRadius: 0
  }
});


///////////////////////pie chart with drilldown//////////////////////////
const colors = Highcharts.getOptions().colors.map((c, i) =>
    Highcharts.color(blueColor)
        .brighten((i-1) / 10)
        .get()
);

const sData = [
  {
    name: 'Office Products',
    y: 0.549,
    drilldown: 'Office Products drill down'
  },
  {
    name: 'Patio, Lawn & Garden',
    y: 0.081,
    drilldown: null
  },
  {
    name: 'Pet Supplies',
    y: 0.18,
    drilldown: null
  },
  {
    name: 'Shoes & Handbags',
    y: 0.13,
    drilldown: null
  },
  {
    name: 'Other',
    y: 0.06,
    drilldown: null
  }
]

sData.sort((a, b) => b.y - a.y);


Highcharts.chart('pieChartWithDrilldown', {
  chart: {
    type: 'pie'
  },
  title : {
    text: 'Percentage of Sales by Category, June 2023',
  },
  accessibility: {
    description: 'Percentage of Sales by Category, June 2023',
    point: {
      valueDescriptionFormat: 'The percentage of {name} is {percentage}%.'
    }
  },
  plotOptions: {
    series: {
      dataLabels: {
        format: '{point.name} {(multiplyBy100 point.y):.1f}%'
      },
      colors,
      allowPointSelect: true,
      cursor: 'pointer',
    }
  },
  tooltip: {
    enabled: false
  },
  series: [
    {
        name: 'Vendamos E-commerce',
        data: sData
    }
  ],
  drilldown: {
    series: [
      {
        name: 'Office Products drill down',
        id: 'Office Products drill down',
        data: [
          [
            'Chair',
            0.2
          ],
          [
            'Desk',
            0.3
          ],
          [
            'Chair',
            0.4
          ],
          [
            'Desk',
            0.1
          ]
        ]
      }
    ]
  },
})


///////////////////////column chart with line//////////////////////////

Highcharts.chart('columnAndLine', {
  title: {
    text: 'Profit Margin and Sales Amounts by Gender'
  },
  accessibility: {
    description: 'Profit Margin and Sales Amounts by Gender',
  },
  xAxis: {
    categories: categories,
  },
  yAxis: [
    {
      tickInterval: 250,
      gridLineWidth: 0,
      title: {
        text: 'Sales by gender',
        rotation: -270,
        margin: 20
      },
    },
    {
      tickInterval: 0.05, 
      gridLineWidth: 0,
      labels: {
        format: '{multiplyBy100 value}%',
      },
      title: {
        text: 'Profit Rate',
      },
      opposite: true
    }
  ],
  plotOptions: {
    series: {
      borderRadius: '0%',
    },
    column: {
      grouping: false, 
      borderWidth: 0, 
    },
    line: {
      marker: {
        symbol: 'square',
        radius: 3 
      }
    }
  },
  legend: {
    symbolRadius: 0,
    verticalAlign: 'top'
  },
  series: [
    {
      type: 'column',
      name: 'Male',
      yAxis: 0,
      color: lightGrayColor,
      pointWidth: 10,
      zIndex: 2,
      data: [1754, 1578, 1488, 2213, 953, 1470, 1843, 2001, 2203, 1681, 1404, 952, 1695, 2093, 1579]
    },
    {
      type: 'column',
      name: 'Female',
      yAxis: 0,
      color: blueColor,
      pointWidth: 16,
      zIndex: 1,
      data: [2462, 2233, 2244, 1637, 2022, 2245, 2495, 2665, 2722, 2463, 2158, 2207, 2900, 2756, 2232]
    },
    {
      type: 'line', 
      name: 'Profit%',
      yAxis: 1,
      color: yellowColor,
      zIndex: 3,
      tooltip: {
        pointFormat: '<span style="color: {series.color}">\u25CF</span>{series.name}: <b>{(multiplyBy100 point.y):.1f}%</b>'
      },
      data: [0.4, 0.26, 0.19, 0.85, 0.83, 0.48, 0.29, 0.62, 0.45, 0.55, 0.6, 0.15, 0.14, 0.19, 0.29],
    }
  ]
})


/////////////////////////stacked column///////////////////////

Highcharts.chart("stackedColumn", {
  chart: {
    type: 'column',
    backgroundColor: '#EBF5F6' //light blue bg color
  },
  title: {
    text: 'Students by Subjects at UK Uinversities, 2010-2011',
    margin: 20
  },
  accessibility: {
    description: 'Students by Subjects at UK Uinversities, 2010-2011',
    point: {
      valueDescriptionFormat: 'Student group {series.name} in the descipline of {category} is {y}.'
    }
  },
  xAxis: {
    categories: ['Business','Health allied','Education','Social studies','Biological studies','Arts and Design','Engineering','Languages','Combined subjects','Computing','History','Physical studies','Law','Medicine & dentistry','Architecture','Mass communication','Mathemetics','Agriculture','Veterinary science']
  },
  yAxis: {
    title: '',
    labels: {      
      formatter: function() {
        return Highcharts.numberFormat(this.value, 0, ',', ',') //a little bit strange
      },
    },
    gridLineColor: '#D7EFF2',
    gridLineWidth: 1,
    minorTickInterval: 'auto',
    minorGridLineColor: '#D7EFF2',    
  },
  plotOptions: {
    column: {
      borderWidth: 0, 
      stacking: 'normal'
    },
    series: {
      borderRadius: '0'
    }
  },
  legend: {
    layout: 'vertical',
    symbolRadius: 0, 
    symbolHeight: 10, 
    align: 'right',
    verticalAlign: 'top',
    itemMarginTop: 3,
    x: -10,
    y: 30,
    floating: true,
  },
  series: [
    {
      name: 'Postgraduate',
      color: yellowColor,
      data: [120000, 60000, 120000, 56000, 28000, 25000, 56000, 22000, 5000, 25000, 23000, 23000, 25000, 23000, 20000, 13000, 8000, 6000, 4000],
    },
    {
      name: 'Undergraduate',
      color: blueColor,
      data: [240000, 245000, 120000, 180000, 175000, 170000, 120000, 120100, 115000, 90000, 90500, 90000, 85000, 50000, 50000, 48000, 45000, 23000, 8000],  
    }
  ]
})


////////////////////////////////line chart///////////////////////////
//1. not responsive
//2. little padding
Highcharts.chart("lineChart", {
  chart: {
    type: 'line',
    width: 430, 
    height: 450,
  },
  title: {
    text: 'Harvard Admit Rate, 2009-2016',
  },
  accessibility: {
    description: 'Harvard Admit Rate, 2009-2016',
    point: {
      valueDescriptionFormat: 'In year {x}, the admision rate of {seriesName} was {y}.'
    }
  },
  xAxis: [
    {
      lineWidth: 1,
      tickWidth: 0.5,
      tickLength: -4,
      tickInterval: 1,
      title: {
        text: 'Harvar Class'
      },
    },
    {
      labels: {
        enabled: false
      },
      tickInterval: 1,
      linkedTo: 0,
      opposite: true,
      lineWidth: 1,
      tickWidth: 0.5,
      tickLength: -4,
    }
  ],
  yAxis: [
    {
      title: {
        text: 'Admit Rate'
      },
      lineWidth: 1,
      tickWidth: 0.5, 
      tickLength: -4,
      max: 50,
      tickInterval: 2.5, 
      gridLineWidth: 0,
      labels: {
        format: '{value}%'
      }
    },
    {
      title: {
        text: null
      },
      labels: {
        enabled: false
      },
      lineWidth: 1,
      tickWidth: 0.5, 
      tickLength: -4,
      opposite: true,
      max: 50,
      min: 5,
      tickInterval: 2.5, 
      gridLineWidth: 0,
    }
  ],
  plotOptions: {
    series: {
      color: blueColor,
    },
    line: {
      marker: {
        enabled: false,
      }
    },
  },
  series: [
    {
      name: 'African American',
      dashStyle: 'Solid', 
      yAxis: 1,
      data: [[2009, 50.00], [2010, 45.00], [2011, 44.00], [2012, 41.00], [2013, 40.00], [2014, 35.00], [2015, 37.00], [2016, 36.80]]
    },
    {
      name: 'Hispanic',
      dashStyle: 'Dot',
      yAxis: 0,
      data: [[2009, 25.00], [2010, 25.00], [2011, 28.00], [2012, 24.00], [2013, 23.00], [2014, 17.50], [2015, 20.00], [2016, 16.00]]
    },
    {
      name: 'White',
      dashStyle: 'LongDashDot',
      yAxis: 0,
      data: [[2009, 17.50], [2010, 19.50], [2011, 17.50], [2012, 16.30], [2013, 14.00], [2014, 13.00], [2015, 12.50], [2016, 12.30]]
    },
    {
      name: 'Asian American',
      dashStyle: 'Dash',
      yAxis: 0,
      data: [[2009, 11.20], [2010, 11.20], [2011, 13.00], [2012, 11.20], [2013, 10.00], [2014, 9.00], [2015, 8.00], [2016, 9.00]]
    }
  ]
})


/////////////////////////////scatter chart//////////////////////////////
//https://kieranhealy.org/blog/archives/2021/01/26/income-and-happiness/

Highcharts.chart('scatterChart', {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Income and Happiness'
  },
  accessibility: {
    description: 'Income and Happiness',
    point: {
      valueDescriptionFormat: 'With the income of {x}, the z-score of {seriesName} is {y}.'
    }
  },
  xAxis: {
    title: {
      text: 'Household Income'
    },
    tickInterval: 100000,
    tickWidth: 0.5,
    tickLength: -5,
  },
  yAxis: {
    title: {
      text: 'z-scored well-being'
    },
    gridLineWidth: 0,
    lineWidth: 1,
    tickWidth: 0.5,
    tickLength: -5,
    max: 0.4,
    min: -0.4,
    tickInterval: 0.2, 
  },
  plotOptions: {
    series: {
      lineWidth: 1
    },
  },
  tooltip: {
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
    itemMarginTop: 5,
    y: -80,
    floating: true,
  },
  series: [
    {
      name: 'Life Satisfaction',
      type: 'line',
      color: blueColor,
      marker: {
        enabled: true,
        symbol: 'square',
        radius: 3,
        fillColor: blueColor,
        lineColor: blueColor,
        lineWidth: 0 
      },
      data: [[15000, -0.35], [29000, -0.34], [36000, -0.18], [48000, -0.15], [58000, -0.08], [63000, -0.03], [75000, -0.01], [83000, 0.03], [100000, 0], [120000, 0.08], [132000, 0.17], [190000, 0.18], [240000, 0.28], [420000, 0.35], [600000, 0.4]],
    },
    {
      name: 'Experienced Well-being',
      type: 'line',
      color: yellowColor,
      marker: {
        enabled: true,
        radius: 3,
        fillColor: yellowColor,
        lineColor: yellowColor,
        lineWidth: 0, 
      },
      data: [[15000, -0.205], [29000, -0.13], [36000, -0.1], [48000, -0.05], [58000, -0.02], [63000, -0.01], [75000, -0.01], [83000, 0.01], [100000, -0.03], [120000, 0.02], [132000, 0.07], [190000, 0.1], [240000, 0.17], [420000, 0.19], [600000, 0.28]],
    },
    {
      name: 'Equal Point (75k)',
      color: 'gray',
      dashStyle: 'Dot',
      showInLegend: false,
      data: [[75000, -0.4], [75000, 0], [75000, 0.4]]
    }
  ]
});


/////////////////////////////waterfall//////////////////////////////
//need a separate module: highcharts-more.js
Highcharts.chart("waterfall", {
  chart: {
    type: 'waterfall',
  },
  title: {
    text: 'Department Headcount in 2023'
  },
  xAxis: {
    type: 'category',
    lineColor: 'gray',
    tickWidth: 0.5,
    tickLength: 5,
    labels: {
      rotation: 90,
    }
  },
  yAxis: {
    title: {
      text: null
    },
    gridLineWidth: 0,
    lineWidth: 1,
    lineColor: 'gray',
    tickWidth: 0.5,
    tickLength: 5
  },
  legend: {
    enabled: false
  },
  series: [
    {
      borderRadius: 0,
      borderWidth: 0,
      pointWidth: 22, 
      upColor: blueColor,
      color: yellowColor,
      data: [
        {
          name: 'Q1',
          y: 24,
          color: lightGrayColor
        },
        {
          name: 'T/0-1',
          y: -2
        },
        {
          name: 'RES-1',
          y: -6
        },
        {
          name: 'TERM',
          y: -2
        },
        {
          name: 'HIRE-1',
          y: 4
        },
        {
          name: 'R/H-1',
          y: 0,
          borderWidth: 1,
        },
        {
          name: 'T/1-1',
          y: 2
        },
        {
          name: 'Q2',
          isIntermediateSum: true,
          color: lightGrayColor
        },
        {
          name: 'T/0-2',
          y: 0,
          borderWidth: 1,
        },
        {
          name: 'RES-2',
          y: -16
        },
        {
          name: 'TERM-2',
          y: 0,
          borderWidth: 1,
        },
        {
          name: 'HIRE-2',
          y: 6
        },
        {
          name: 'R/H',
          y: 7
        },
        {
          name: 'T/1',
          y: 3
        },
        {
          name: 'Q3',
          isSum: true,
          color: lightGrayColor
        }
      ],
    }
  ]
})



/////////////////////////////bubble chart//////////////////////////////
Highcharts.chart('bubbleChart', {
  chart: {
   type: 'bubble',
    plotBorderWidth: 1,
  },
  title: {
    text: 'Housing Prices, Area, and Age in Two Cities',
  },
  accessibility: {
    description: 'Housing Prices, Area, and Age in Two Cities',
    point: {
      valueDescriptionFormat: 'With {xDescription} years of construction, and area of {yDescription}) square meter, the estimated house property value is {value} in city {zDescription}.'
    }
  },
  xAxis: {
    gridLineWidth: 1,
    title: {
      text: 'Years of Construction'
    },
    lineColor:lightGrayColor,
    tickColor: lightGrayColor,
    tickLength: 0
  },
  legend: {
    verticalAlign: 'top'
  },
  yAxis: {
    title: {
      text: 'Area (m\u00B2)'//sup
    },
    labels: {
      format: '{value}'
    }
  },
  tooltip: {
    format: '<span style="color:{series.color}">\u25CF</span> {series.name} <br> ({point.x}, {point.y}), Estimated Value: ${point.z}K'
  },
  series: [
    {
      name: 'City A',
      data: [[1, 200, 434], [4, 150, 280], [5, 80, 120], [2, 300, 600], [4, 100, 180], [5, 90, 150], [11, 200, 300], [10, 30, 40], [6, 70, 100], [8, 30, 90]],
      color:blueColor,
      marker: {
        fillColor: blueColor,
        lineWidth: 0
    }
  }, 
  {
    name: 'City B',
    data: [[2, 200, 400], [3, 120, 220], [2, 60, 130], [3, 70, 130], [5, 90, 160], [7, 150, 220], [9, 50, 60], [12, 30, 30], [8, 100, 170], [10, 200, 280]],
      color: yellowColor,
      marker: {
          fillColor:yellowColor,
          lineWidth: 0
      }
  }]
});


/////////////////////////////area line chart//////////////////////////////
function lineChart(tempData, hour) {
  Highcharts.chart("areaLineChart", {
    chart: {
      type: "areaspline",
    },
    title: {
        text: 'Temperature in 24 Hours',
    },
    accessibility: {
      description: 'Temperature in 24 Hours',
      point: {
        valueDescriptionFormat: 'At {x} o\'clock, the temperature will be {y}.'
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      tickInterval: 1,
      tickLength: 5,
      labels: {
        formatter: function () {
          if (this.value > 24) {
            return this.value - 24;
          } else {
            return this.value;
          }
        }
      }
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
          enabled: false,
        },
        gridLineWidth: 0
    },
    tooltip: {
      enabled: false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        series: {
            pointStart: hour,
            pointInterval: 1,
            dataLabels: {
              enabled: true, 
              format: "{point.y}"
            }
        },
        areaspline: {
            fillOpacity: 0.2
        }
    },
    series: [{ 
        name: "Temperature",
        data: tempData
    }]      
  });
}

const tempData = [19, 19, 19, 18, 18, 17, 16, 15, 14, 13, 14, 15, 17, 19, 21, 22, 23, 25, 25, 25, 25, 25, 23, 21]
const hour = 21
lineChart(tempData, hour)


/////////////////////////////map chart//////////////////////////////
function chartInCallBack(dataForMapChart) {
  const url = "https://code.highcharts.com/mapdata/countries/ca/ca-all.topo.json"; 
  fetch(url)
    .then(response => response.json()
    )
    .then(geojson => {
      createMapChart("mapChart", geojson, dataForMapChart);
    })
    .catch(error => {
      console.error(error);
    });
}


function createMapChart(id, geoJSON, data) {
  Highcharts.mapChart(id,{
    chart: {
      map: geoJSON,
    },
    title: {
        text: 'Temperatures in Major Cities Across Canadian Provinces',
    },
    accessibility: {
      description: 'Temperatures in Major Cities Across Canadian Provinces',
      valueDescriptionFormat: 'The temperature of major city in {point.name} is {point.value}.'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'top',
        align: 'right',
        x: -10
      }
    },
    colorAxis: {
      minColor: "#E2F3FF",
      maxColor: "#2CAFFE"
    },
    series: [{
      data: data,
      name: 'Temperature',
      states: {
        hover: {
          color: '#e6ebf5'
        }
      },
      dataLabels: {
        enabled: true,
          format: '{point.name}'
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.x}°C</b>'
      },
    }]      
  });
}

const dataForMapChart = [
  ['ca-bc', 22.51], ['ca-nu', 9.97], ['ca-nt', 24.1],
  ['ca-ab', 21.57], ['ca-nl', 12.56], ['ca-sk', 16.95], ['ca-mb', 21.87],
  ['ca-qc', 23.6], ['ca-on', 18.8], ['ca-nb', 20.62], ['ca-ns', 21],
  ['ca-pe', 20], ['ca-yt', 18.43]
]

chartInCallBack(dataForMapChart)