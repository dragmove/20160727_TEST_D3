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

    var dataset = [ 5, 10, 15, 20, 25 ];

    var svg = d3.select('svg');

    var width = svg.attr('width'),
      height = svg.attr('height');

    var circles = svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle');

    circles.attr('cx', function(d, i) {
      return (i * 50) + 50;
    })
    .attr('cy', height / 2)
    .attr('r', function(d) {
      return d;
    })
    .attr('fill', 'rgba(128, 0, 128, 1.0')
    .attr('stroke', 'rgba(255, 0, 0, 0.5')
    .attr('stroke-width', function(d) {
      return d / 2;
    });


  }
}(jQuery));
