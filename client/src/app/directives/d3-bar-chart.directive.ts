import * as d3 from "d3";
import { Directive, ElementRef, Input } from "@angular/core";
import { D3ChartsDirective } from "./d3-charts.directive";

@Directive({
  selector: "[d3-bar-chart]",
})
export class D3BarChartDirective extends D3ChartsDirective {
  @Input("x") xDataName: string;
  @Input("y") yDataName: string;

  constructor(chart: D3ChartsDirective, private El: ElementRef) {
    super(El);
  }

  redraw() {
    var margin = {
        top: this.config.top,
        right: this.config.right,
        bottom: this.config.bottom,
        left: this.config.left,
      },
      width = this.config.width - margin.left - margin.right,
      height = this.config.height - margin.top - margin.bottom;
    var barColor = this.color;
    var tooltip = this.toolTip();

    var svg = d3
      .select(this.El.nativeElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("text-decoration", "underline")
      .text(this.name ? this.name : "");
    var x = d3.scaleBand().range([0, width]).padding(0.4);
    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(10);
    var yAxis = d3.axisLeft(y).tickSize([5]).tickPadding(5);

    if (!this.showY) {
      yAxis = (g) => g.call((g) => g.select(".domain").remove());
    }
    if (!this.showX) {
      xAxis = (g) => g.call((g) => g.select(".domain").remove());
    }
    x.domain(
      this.data.map((d) => {
        return d[this.xDataName];
      })
    );
    y.domain([
      0,
      d3.max(this.data, (d) => {
        return d[this.yDataName];
      }),
    ]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg.append("g").attr("class", "y axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .on("click", function (d) {
        tooltip.style("display", "none");
        if (this.drillthrough) {
          this.onDrillthrough.emit(d);
        }
      })
      .on("mousemove", function (d) {
        if (this.tooltip) {
          tooltip.style("left", d3.event.pageX + 10 + "px");
          tooltip.style("top", d3.event.pageY - 25 + "px");
          tooltip.style("display", "block");
          if (this.displaylabel.length > 0) {
            tooltip.html(
              this.displaylabel[0] +
                ": " +
                d[this.label[0]] +
                "<br>" +
                this.displayvalue[0] +
                ": " +
                d[this.value[0]]
            );
          } else {
            tooltip.html(
              this.label[0] +
                ": " +
                d[this.label[0]] +
                "<br>" +
                this.value[0] +
                ": " +
                d[this.value[0]]
            );
          }
        }
      })
      .on("mouseout", function (d) {
        if (this.tooltip) {
          tooltip.style("display", "none");
        }
      })
      .style("display", (d) => {
        return d[this.value[0]] === null ? "none" : null;
      })
      .style("fill", (d) => {
        return barColor[0];
      })
      .attr("x", (d) => {
        return x(d[this.label[0]]);
      })
      .attr("width", x.bandwidth())
      .attr("y", (d) => {
        return height;
      })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay(function (d, i) {
        return i * 150;
      })
      .attr("y", (d) => {
        return y(d[this.value[0]]);
      })
      .attr("height", (d) => {
        return height - y(d[this.value[0]]);
      });

    svg
      .selectAll(".label")
      .data(this.data)
      .enter()
      .append("text")
      .attr("class", "label")
      .style("display", (d) => {
        return d[this.value[0]] === null ? "none" : null;
      })
      .style("font-size", 10)
      .attr("x", (d) => {
        return x(d[this.label[0]]) + x.bandwidth() / 2 - 7;
      })
      .style("fill", (d) => {
        this.fontcolor ? this.fontcolor : "black";
      })
      .attr("y", (d) => {
        return height;
      })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay((d, i) => {
        return i * 150;
      })
      .text((d) => {
        return d[this.value[0]];
      })
      .attr("y", (d) => {
        return y(d[this.value[0]]) + 0.1;
      })
      .attr("dy", "-0.2em");
  }
}
