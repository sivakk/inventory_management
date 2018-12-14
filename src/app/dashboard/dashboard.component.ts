import { Component, OnInit } from '@angular/core';
import * as  d3 from 'd3';
import * as $ from 'jquery';
import { DashDataService } from '../dash-data.service';
import { EmployeeService } from '../employee.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data = [

    { 'date': '24-Apr-12', 'price': 500, 'profit': '1100', 'khata': '500'},
    { 'date': '25-Apr-12', 'price': 600 , 'profit': '1000', 'khata': '550'},
    { 'date': '26-Apr-12', 'price': 700 , 'profit': '900', 'khata': '600'},
    { 'date': '27-Apr-12', 'price': 800 , 'profit': '800', 'khata': '650'},
    { 'date': '28-Apr-12', 'price': 900 , 'profit': '700', 'khata': '600'},
    { 'date': '29-Apr-12', 'price': 1000 , 'profit': '600', 'khata': '550'},
    { 'date': '30-Apr-12', 'price': 1100 , 'profit': '500', 'khata': '500'}

];

    loading = false;
    public dashData: any = [];

  constructor(
    private dataService: DashDataService,
  ) {  }

  ngOnInit() {

    this.dataService.getData()
      .subscribe(data => {
          this.dashData.push(data);
          this.startChart();
      });
  }


  startChart() {

    const data = [

      { 'date': '24-Apr-12', 'y': 100, 'profit': 1100, 'khata': 500},
      { 'date': '25-Apr-12', 'y': 200 , 'profit': 1000, 'khata': 550},
      { 'date': '26-Apr-12', 'y': 400 , 'profit': 900, 'khata': 600},
      { 'date': '27-Apr-12', 'y': 800 , 'profit': 800, 'khata': 650},
      { 'date': '28-Apr-12', 'y': 400 , 'profit': 700, 'khata': 600},
      { 'date': '29-Apr-12', 'y': 200 , 'profit': 600, 'khata': 550},
      { 'date': '30-Apr-12', 'y': 100 , 'profit': 500, 'khata': 500}

  ];


    const responsiveWidth = $('#subjectLine').width();

    // console.log('responseive@@@ ',responsiveWidth)

    const margin = {top: 80, right: 40, bottom: 40, left: 40}
  , width = responsiveWidth - margin.left - margin.right // Use the div's width
  , height = 450 - margin.top - margin.bottom; // Use the window's height

  // var parseTime = d3.timeParse('%d-%b-%y');

    // The number of datapoints
    const n = 7;


  //   this.data.forEach(function(d) {
  //     d.date = parseTime(d.date);
  //     console.log('date:', d.date)
  //     d.price = +d.price;
  //     // console.log('xscale output',xScale(d.date));
  // });



// 5. X scale will use the index of our data
const xScale = d3.scaleLinear()
    .domain([0, n - 1]) // input: d3.extent(this.dashData[0], function(d) { return d.date; }) //length of array
    .range([0, width]); // output

  // console.log('fgdfgdfgdfsg',xScale(new Date(2000, 0, 1,  5)));


const yScale = d3.scaleLinear()
    // input: d3.max(this.dashData[0], function(d) { return +d.price; })
    .domain([0, d3.max(data, function(d) {  return d.y; })])
    .range([height, 0]); // output

const div = d3.select('#subjectLine').append('div')
.attr('class', 'tooltip')
.style('opacity', 0);

// 7. d3's line generator
const expensesLine = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3.curveCatmullRom); // apply smoothing to the line

// // 7. d3's line generator
// var profitLine = d3.line()
//     .x(function(d, i) { console.log(); return xScale(d.date); }) // set the x values for the line generator
//     .y(function(d) { console.log(); return yScale(d.price); }) // set the y values for the line generator
//     .curve(d3.curveCatmullRom) // apply smoothing to the line

// // 7. d3's line generator
// var investmentLine = d3.line()
//     .x(function(d, i) { console.log(); return xScale(i); }) // set the x values for the line generator
//     .y(function(d) { console.log(); return yScale(d.y); }) // set the y values for the line generator
//     .curve(d3.curveCatmullRom) // apply smoothing to the line



// 8. An array of objects of length N. Each object has key -> value pair, the key being 'y' and the value is a random number
const dataset = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)()}; });
const dataset2 = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)()}; });
const dataset3 = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)()}; });

// console.log('dataset', dataset);

// console.log('######',dataset)

// 1. Add the SVG to the page and employ #2
const svg = d3.select('#subjectLine').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


// 3. Call the x axis in a group tag
svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + height + ')').attr('fill', '#6d6d6d')
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
svg.append('path')
    .datum(data) // 10. Binds data to the line
    .attr('class', 'expensesLine')
    .attr('fill', 'none')
    .attr('stroke-width', '3px')
    .attr('stroke', '#73c5ec') // Assign a class for styling
    .attr('d', expensesLine); // 11. Calls the line generator

// svg.append('path')
//     .datum(dataset2) // 10. Binds data to the line
//     .attr('class', 'profitlLine')
//     .attr('fill', 'none')
//     .attr('stroke-width', '3px')
//     .attr('stroke', '#68de71') // Assign a class for styling
//     .attr('d', profitLine); // 11. Calls the line generator

// svg.append('path')
//     .datum(dataset3) // 10. Binds data to the line
//     .attr('class', 'investmentlLine')
//     .attr('fill', 'none')
//     .attr('stroke-width', '3px')
//     .attr('stroke', '#f1b786') // Assign a class for styling
//     .attr('d', investmentLine); // 11. Calls the line generator

// 12. Appends a circle for each datapoint
// svg.selectAll('.investmentDot')
//     .data(dataset)
//   .enter().append('circle') // Uses the enter().append() method
//     .attr('class', 'dot') // Assign a class for styling
//     .attr('cx', function(d,i) { console.log(); return xScale(i) })
//     .attr('cy', function(d) { return yScale(d.y) })
//     .attr('r', 5).attr('fill','#73c5ec')
//     .on('mouseover', function(d) {
//         var thisColor = d3.select(this).style('fill')
//          d3.select(this).attr('r', '8')
//          div.style('display', 'block')
//        div.transition()
//          .duration(300)
//          .style('opacity', .49);
//        div .html(
//          d.x +'<br/>'  + d.y)
//         .style('background-color', thisColor)
//          .style('left', (d3.event.pageX ) + 'px')
//          .style('top', (d3.event.pageY - 78) + 'px')
//        })
// 	.on('mouseout', function(d) {
//         d3.select(this).attr('r', '5.5')
//         div.transition()
//         .duration(200)
//         .style('opacity', '0')
// 		.style('display', 'none')
//         });

let subjectLegend = svg.append('g')
.attr('class', 'mysubjLegend')
.attr('transform', 'translate(' + ( width - (width - width / 1.5) ) + ',-16)');

// svg.selectAll('.profitDot')
//     .data(dataset2)
//   .enter().append('circle') // Uses the enter().append() method
//     .attr('class', 'dot') // Assign a class for styling
//     .attr('cx', function(d,i) { console.log(); return xScale(i) })
//     .attr('cy', function(d) { return yScale(d.y) })
//     .attr('r', 5)
//     .attr('fill','#68de71')
//     .on('mouseover', function(d) {
//         var thisColor = d3.select(this).style('fill')
//          d3.select(this).attr('r', '8')
//          div.style('display', 'block')
//        div.transition()
//          .duration(300)
//          .style('opacity', .49);
//        div .html(
//          d.x +'<br/>'  + d.y)
//         .style('background-color', thisColor)
//          .style('left', (d3.event.pageX ) + 'px')
//          .style('top', (d3.event.pageY - 78) + 'px')
//        })
// 	.on('mouseout', function(d) {
//         d3.select(this).attr('r', '5.5')
//         div.transition()
//         .duration(200)
//         .style('opacity', '0')
// 		.style('display', 'none')
//         });

//         var subjectLegend = svg.append('g')
// .attr('class','profitLegend')
// .attr('transform','translate('+ ( width - (width-width/1.5) ) +',-16)');

// svg.selectAll('.expensesDot')
//     .data(dataset3)
//   .enter().append('circle') // Uses the enter().append() method
//     .attr('class', 'dot') // Assign a class for styling
//     .attr('cx', function(d,i) { console.log(); return xScale(i) })
//     .attr('cy', function(d) { return yScale(d.y) })
//     .attr('r', 5)
//     .attr('fill','#f1b786')
//     .on('mouseover', function(d) {
//         var thisColor = d3.select(this).style('fill')
//          d3.select(this).attr('r', '8')
//          div.style('display', 'block')
//        div.transition()
//          .duration(300)
//          .style('opacity', .49);
//        div .html(
//          d.x +'<br/>'  + d.y)
//         .style('background-color', thisColor)
//          .style('left', (d3.event.pageX ) + 'px'
//          .style('top', (d3.event.pageY - 78) + 'px')
//        })
// 	.on('mouseout', function(d) {
//         d3.select(this).attr('r', '5.5')
//         div.transition()
//         .duration(200)
//         .style('opacity', '0')
// 		.style('display', 'none')
//         });

subjectLegend = svg.append('g')
.attr('class', 'expensesLegend')
.attr('transform', 'translate(' + ( width - (width - width / 1.5) ) + ',-16)');

subjectLegend.append('g').attr('class', 'expenses').attr('transform', 'translate(-5,0)')
.append('text')
.attr('x', '25').attr('y', '8').attr('fill', '#6d6d6d')
.text('Expenses'); // text here

d3.select('.expenses')
.append('circle')
.attr('cx', 10)
.attr('cy', 4)
.attr('r', 6)
.style('fill', '#f1b786');

subjectLegend.append('g').attr('class', 'profit')
.append('text')
.attr('x', '115').attr('y', '8').attr('fill', '#6d6d6d')
.text('profit'); // text here

d3.select('.profit')
.append('circle')
.attr('cx', 100)
.attr('cy', 4)
.attr('r', 6)
.style('fill', '#68de71');

subjectLegend.append('g').attr('class', 'investment').attr('transform', 'translate(-5,0)')
.append('text')
.attr('x', '185').attr('y', '8').attr('fill', '#6d6d6d')
.text('Investment'); // text here

d3.select('.investment')
.append('circle')
.attr('cx', 170)
.attr('cy', 4)
.attr('r', 6)
.style('fill', '#73c5ec');





//       .on('mousemove', mousemove);

//   var focus = svg.append('g')
//       .attr('class', 'focus')
//       .style('display', 'none');

//   focus.append('circle')
//       .attr('r', 4.5);

//   focus.append('text')
//       .attr('x', 9)
//       .attr('dy', '.35em');

//   svg.append('rect')
//       .attr('class', 'overlay')
//       .attr('width', width)
//       .attr('height', height)
//       .on('mouseover', function() { focus.style('display', null); })
//       .on('mouseout', function() { focus.style('display', 'none'); })
//       .on('mousemove', mousemove);

//   function mousemove() {
//     var x0 = x.invert(d3.mouse(this)[0]),
//         i = bisectDate(data, x0, 1),
//         d0 = data[i - 1],
//         d1 = data[i],
//         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
//     focus.attr('transform', 'translate(' + x(d.date) + ',' + y(d.close) + ')');
//     focus.select('text').text(d);
//   }


    }

}
