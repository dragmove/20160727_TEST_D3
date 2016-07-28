/*
import React, { Component } from 'react';
import { render } from 'react-dom';

import HelloWorld from './components/HelloWorld'

class App extends Component {
    render() {
        return (
            <div>
                <HelloWorld />
            </div>
        );
    }
}
*/

(function($) {
  "use strict";

  /*
   <?xml version="1.0" encoding="UTF-8" ?>
   <data>
   <price>
   <item date="06.30" avg="0" />
   <item date="07.01" avg="5" />
   <item date="07.02" avg="0" />
   <item date="07.03" avg="5" />
   <item date="07.04" avg="5" />
   <item date="07.05" avg="5" />
   <item date="07.06" avg="0" />
   <item date="07.07" avg="5" />
   <item date="07.08" avg="4" />
   <item date="07.09" avg="5" />
   <item date="07.10" avg="5" />
   <item date="07.11" avg="5" />
   <item date="07.12" avg="5" />
   <item date="07.13" avg="5" />
   <item date="07.14" avg="5" />
   <item date="07.15" avg="5" />
   <item date="07.16" avg="5" />
   <item date="07.17" avg="5" />
   <item date="07.18" avg="4" />
   <item date="07.19" avg="5" />
   <item date="07.20" avg="5" />
   <item date="07.21" avg="4" />
   <item date="07.22" avg="5" />
   <item date="07.23" avg="4" />
   <item date="07.24" avg="5" />
   <item date="07.25" avg="5" />
   <item date="07.26" avg="5" />
   <item date="07.27" avg="0" />
   </price>
   </data>
   */

  $(document).ready(init);

  function init() {
    /*
    var dataset = [ 5, 10, 15, 20, 25 ];

    d3.select('body')
      .selectAll('p')
      .data(dataset)
      .enter()
      .append('p')
      .text(function(d) {
        return 'data : ' + d;
      });
    */

    setD3Graph();
    setD3Scale();
  }

  function setD3Graph() {
    var dataset = [ 5, 10, 15, 20, 25 ];

    var svg = d3.select('.svg-d3');

    var width = svg.attr('width'),
      height = svg.attr('height');

    // circles
    var circles = svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle');

    circles
      .attr('cx', function(d, i) {
        return (i * 50) + 50;
      })
      .attr('cy', height / 2)
      .attr('r', function(d) {
        return d;
      })
      .attr('fill', 'rgba(128, 0, 128, 1.0)')
      .attr('stroke', 'rgba(255, 0, 0, 0.5)')
      .attr('stroke-width', function(d) {
        return d / 2;
      });

    // rects
    var rectAttr = {
      y: 0,
      width: 20
    };

    var rects = svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect');

    rects
      .attr('x', function(d, i) {
        return (i * 50) + 50;
      })
      .attr('y', rectAttr.y)
      .attr('width', rectAttr.width)
      .attr('height', function(d, i) {
        return d + 'px';
      })
      .attr('fill', '#f00')
      .attr('opacity', function(d, i) {
        return i * (1 / dataset.length);
      });

    // label
    var labels = svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text');

    labels
      .text(function(d) {
        return d;
      })
      .attr('x', function(d, i) {
        return (i * 50) + 50;
      })
      .attr('y', function(d) {
        return 50 + 'px';
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', '#f00')
      .attr('text-anchor', 'middle');
  }

  function setD3Scale() {
    var data = {
      items: [
        { date: '06.30', avg: 0 },
        { date: '07.01', avg: 5 },
        { date: '07.02', avg: 40 },
        { date: '07.03', avg: 5 },
        { date: '07.04', avg: 20 },
        { date: '07.05', avg: 15 },
        { date: '07.06', avg: 0 },
        { date: '07.07', avg: 5 },
        { date: '07.08', avg: 65 },
        { date: '07.09', avg: 10 },
        { date: '07.10', avg: 5 },
        { date: '07.11', avg: 5 },
        { date: '07.12', avg: 5 },
        { date: '07.13', avg: 7 },
        { date: '07.14', avg: 5 },
        { date: '07.15', avg: 73 },
        { date: '07.16', avg: 5 },
        { date: '07.17', avg: 25 },
        { date: '07.18', avg: 4 },
        { date: '07.19', avg: 5 },
        { date: '07.20', avg: 5 },
        { date: '07.21', avg: 4 },
        { date: '07.22', avg: 100 },
        { date: '07.23', avg: 4 },
        { date: '07.24', avg: 5 },
        { date: '07.25', avg: 5 },
        { date: '07.26', avg: 5 },
        { date: '07.27', avg: 100 }
      ]
    };

    var svg = d3.select('.svg-d3-scale'),
      width = svg.attr('width'),
      height = svg.attr('height'),

      paddingLeft = 30,
      paddingRight = 20,
      paddingTop = 20,
      paddingBottom = 20;

    var minAvg = d3.min(data.items, function(d) {
        return d.avg;
      }), 
      maxAvg = d3.max(data.items, function(d) {
        return d.avg;
      });

    var scaleX = d3.scaleLinear()
      .domain([0, data.items.length])
      .range([0 + paddingLeft, width - paddingRight]);
    // console.log( scaleX(data.items.length) );

    /*
    var scaleY = d3.scaleLinear()
      .domain([0, maxAvg])
      .range([0, height - paddingBottom]);
    console.log( scaleY(10) );
    */
    var reverseScaleY = d3.scaleLinear()
      .domain([0, maxAvg])
      // .range([paddingTop, height - paddingBottom]);
      .range([height - paddingBottom, paddingTop]);

    // make axis
    var axisX = d3.axisBottom()
      .scale(scaleX)
      .ticks(data.items.length);

    svg.append('g')
      .attr('class', 'axis-x')
      .attr('transform', 'translate(0,' + (height - paddingBottom) +')')
      .call(axisX);

    var axisY = d3.axisLeft()
      .scale(reverseScaleY)
      .ticks(10);

    svg.append('g')
      .attr('class', 'axis-y')
      .attr('transform', 'translate(' + paddingLeft + ',0)')
      .call(axisY);

    // dots
    var rScale = d3.scaleLinear()
      .domain([0, maxAvg])
      .range([2, 10]);

    var circles = svg.selectAll('circle')
      .data(data.items)
      .enter()
      .append('circle')
      .attr('cx', function(d, i) {
        var space = (width - (paddingLeft + paddingRight)) / data.items.length;
        return paddingLeft + space + (i * space);
      })
      .attr('cy', function(d) {
        return reverseScaleY(d.avg);
      })
      .attr('r', function(d) {
        return rScale(d.avg);
      })
      .attr('fill', 'rgba(128, 128, 0, 1.0)')
      .attr('stroke', 'rgba(255, 0, 0, 0.5)')
      .attr('stroke-width', function(d) {
        return 5;
      });

    /*
    // append 'title'
    circles.append('title')
      .text(function(d) {
        return d.avg;
      });
      */

    circles.on('mouseover', function(d, i) {
      //console.log('d :', d);
      //console.log(i);
      //console.log(this);

      d3.select(this)
        .transition()
        .duration(1000)
        .ease(d3.easeExpOut)
        // .delay(1000)
        .style("fill", "blue");
    });

    circles.on('mouseover', function(d, i) {
      /*
      d3.select(this)
        .transition()
        .duration(100)
        .ease(d3.easeExpOut)
        .style("fill", "blue");
        */
      d3.select(this)
        .attr('fill', 'rgba(255, 255, 255, 1.0');
    });

    circles.on('mouseout', function(d, i) {
      /*
      d3.select(this)
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .style("fill", "rgba(128, 128, 0, 1.0)");
        */
      d3.select(this)
        .attr('fill', 'rgba(128, 128, 0, 1.0');
    });
















  }
}(jQuery));
