(function ($) {
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
    setD3Scale( {
      wrap: $('.svg-contents').get(0)
    } );
  }

  function setD3Scale(options) {
    const DATAS = {
      items: [
        {date: '06.30', avg: 800},
        {date: '07.01', avg: 250},
        {date: '07.02', avg: 400},
        {date: '07.03', avg: 350},
        {date: '07.04', avg: 200},
        {date: '07.05', avg: 115},
        {date: '07.06', avg: 100},
        {date: '07.07', avg: 150},
        {date: '07.08', avg: 265},
        {date: '07.09', avg: 410},
        {date: '07.10', avg: 500},
        {date: '07.11', avg: 500},
        {date: '07.12', avg: 150},
        {date: '07.13', avg: 700},
        {date: '07.14', avg: 150},
        {date: '07.15', avg: 1173},
        {date: '07.16', avg: 150},
        {date: '07.17', avg: 225},
        {date: '07.18', avg: 440},
        {date: '07.19', avg: 250},
        {date: '07.20', avg: 350},
        {date: '07.21', avg: 400},
        {date: '07.22', avg: 100},
        {date: '07.23', avg: 540},
        {date: '07.24', avg: 250},
        {date: '07.25', avg: 670},
        {date: '07.26', avg: 950},
        {date: '07.27', avg: 2140}
      ]
    };

    let svg = d3.select(options.wrap),

      viewBoxWidth = svg.attr('viewBox').split(' ')[2],
      viewBoxHeight = svg.attr('viewBox').split(' ')[3],

      width = svg.attr('width') || viewBoxWidth,
      height = svg.attr('height') || viewBoxHeight,

      paddingLeft = 50,
      paddingRight = 50,
      paddingTop = 20,
      paddingBottom = 20;

      //usableWidth = width - (paddingLeft + paddingRight),
      //usableHeight = height - (paddingTop + paddingBottom);

    let minAvg = d3.min(DATAS.items, function (d) {
      return d.avg;
    }),
    maxAvg = d3.max(DATAS.items, function (d) {
      return d.avg;
    });

    let divideY = 10;

    /*
     * create scaleX, scaleY
     */
    let scaleX = d3.scaleLinear()
      .domain([0, DATAS.items.length]) // 0 ~ 28
      .range([0 + paddingLeft, width - paddingRight]);

    let reverseScaleY = d3.scaleLinear()
      .domain([minAvg, maxAvg])
      // .range([paddingTop, height - paddingBottom]);
      .range([height - paddingBottom, paddingTop]);
    /*
     // original scaleY
     var scaleY = d3.scaleLinear()
     .domain([0, maxAvg])
     .range([0, height - paddingBottom]);
     console.log( scaleY(10) );
     */

    /*
     * create axis
     */
    let ticksX = parseInt( (width/viewBoxWidth) * DATAS.items.length),
      ticksY = divideY;

    let axisX = d3.axisBottom()
      .scale(scaleX)
      .tickFormat(function(i) {
        return i;
        /*
        var item = DATAS.items[i - 1];
        if(item) {
          return item.date;
        }
        */
      })
      .ticks(ticksX);

    svg.append('g')
      .attr('class', 'axis-x')
      .attr('transform', 'translate(0,' + (height - paddingBottom) + ')')
      .call(axisX);

    let axisY = d3.axisLeft()
      .scale(reverseScaleY)
      .ticks(ticksY);

    svg.append('g')
      .attr('class', 'axis-y')
      .attr('transform', 'translate(' + paddingLeft + ',0)')
      .call(axisY);

    /*
     * create lines
     */
    let lineGroup = svg.append('g')
      .attr('class', 'lines');

    let lines = lineGroup.selectAll('line')
      .data(DATAS.items)
      .enter()
      .append('line')
      .attr('x1', function (d, i) {
        if (i <= 0) return; // there is not 1st line.

        let space = (width - (paddingLeft + paddingRight)) / DATAS.items.length,
          x1 = paddingLeft + space + ( (i - 1) * space);
        return x1;
      })
      .attr('y1', function (d, i) {
        if (i <= 0) return; // there is not 1st line.

        let _d = DATAS.items[i - 1],
          y1 = reverseScaleY(_d.avg);
        return y1;
      })
      .attr('x2', function (d, i) {
        if (i <= 0) return; // there is not 1st line.

        let space = (width - (paddingLeft + paddingRight)) / DATAS.items.length,
          x2 = paddingLeft + space + (i * space);
        return x2;
      })
      .attr('y2', function (d, i) {
        if (i <= 0) return; // there is not 1st line.
        let y2 = reverseScaleY(d.avg);
        return y2;
      });

    /*
     * create circles
     */
    let rScale = d3.scaleLinear()
      .domain([0, maxAvg])
      .range([2, 10]);

    let circleGroup = svg.append('g')
      .attr('class', 'circles');

    let circles = circleGroup.selectAll('circle')
      .data(DATAS.items)
      .enter()
      .append('circle')
      .attr('cx', function (d, i) {
        var space = (width - (paddingLeft + paddingRight)) / DATAS.items.length;
        return paddingLeft + space + (i * space);
      })
      .attr('cy', function (d) {
        return reverseScaleY(d.avg);
      })
      .attr('r', function (d) {
        return rScale(d.avg);
      })
      .attr('fill', 'rgba(128, 128, 0, 1.0)')
      .attr('stroke', 'rgba(255, 0, 0, 0.5)')
      .attr('stroke-width', function (d) {
        return 5;
      });

    circles.on('mouseover', function (d, i) {
      /*
       d3.select(this)
       .transition()
       .duration(100)
       .ease(d3.easeExpOut)
       .style("fill", "blue");
       */
      d3.select(this)
        .attr('fill', 'rgba(255, 255, 255, 1.0)');
    });

    circles.on('mouseout', function (d, i) {
      /*
       d3.select(this)
       .transition()
       .duration(500)
       .ease(d3.easeCubicOut)
       .style("fill", "rgba(128, 128, 0, 1.0)");
       */
      d3.select(this)
        .attr('fill', 'rgba(128, 128, 0, 1.0)');
    });

    $(window).on('resize', resize);
    resize();

    function resize() {
      width = parseInt(svg.style('width'));
      height = parseInt(svg.style('height'));

      if(width >= 520) {
        ticksX = parseInt( (width/viewBoxWidth) * DATAS.items.length );
        ticksY = divideY;
      }else if( width >= 480 ) {
        ticksX = parseInt( DATAS.items.length / 2 );
        ticksY = parseInt( divideY / 2 );
      }else {
        ticksX = parseInt( DATAS.items.length / 4 );
        ticksY = parseInt( divideY / 4 );
      }
      axisX.ticks( ticksX );
      svg.select('.axis-x').call(axisX);

      axisY.ticks( ticksY );
      svg.select('.axis-y').call(axisY);

      // usableWidth = parseInt(svg.style('width')) - (paddingLeft + paddingRight);
      // usableHeight = parseInt(svg.style('height')) - (paddingTop + paddingBottom);




    }
  }
}(jQuery));