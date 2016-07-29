(function ($) {
  "use strict";
  $(document).ready(init);

  function init() {
    setD3Training();
  }

  function setD3Training() {
    const DATAS = [5, 10, 15, 20, 25];

    let svg = d3.select('.svg-d3-training'),
      width = svg.attr('width'),
      height = svg.attr('height'),
      leftPadding = 10;

    /*
     * create circles
     */
    let circles = svg.selectAll('circle')
      .data(DATAS)
      .enter()
      .append('circle')
      .attr('cx', function (d, i) {
        return (i * 50) + leftPadding;
      })
      .attr('cy', 30)
      .attr('r', function (d) {
        return d / 2;
      })
      .attr('fill', 'rgba(128, 0, 128, 1.0)')
      .attr('stroke', 'rgba(255, 0, 0, 0.5)')
      .attr('stroke-width', function (d) {
        return d / 4;
      });

    /*
     * create rects
     */
    let rects = svg.selectAll('rect')
      .data(DATAS)
      .enter()
      .append('rect')
      .attr('x', function (d, i) {
        return (i * 50) + leftPadding;
      })
      .attr('y', 75)
      .attr('width', 20)
      .attr('height', function (d, i) {
        return d + 'px';
      })
      .attr('fill', '#3F51B5')
      .attr('opacity', function (d, i) {
        return 1 - (i * 0.1);
      });

    /*
     * create labels
     */
    let labels = svg.selectAll('text')
      .data(DATAS)
      .enter()
      .append('text')
      .text(function (d) {
        return d;
      })
      .attr('x', function (d, i) {
        return (i * 50) + leftPadding;
      })
      .attr('y', function (d) {
        return 140;
      });
  }
}(jQuery));