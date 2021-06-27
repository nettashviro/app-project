import * as d3 from "d3";
import { Directive, ElementRef, Input } from "@angular/core";
import { D3ChartsDirective } from "./d3-charts.directive";

@Directive({
  selector: "[d3-pie-chart]",
})
export class D3PieChartDirective extends D3ChartsDirective {
  _current: any;

  constructor(private El: ElementRef) {
    super(El);
  }

  /**
   * ARC Tween fror Pie Chart
   */
  private arcTween(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(1);
    return (t) => d3.arc().innerRadius(0).outerRadius(i(t));
  }

  redraw() {
    var self = this;
    var tooltip = self.toolTip();
    var height = self.config.height,
      width = self.config.width,
      radius = Math.min(height, width) / 2;
    const svg = d3
      .select(self.El.nativeElement)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(90)`);
    const color = d3.scaleOrdinal(self.color);

    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const path = svg.selectAll("path").data(pie(self.data));

    path.transition().duration(200).attrTween("d", self.arcTween);

    path
      .enter()
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .each(function (d) {
        self._current = d;
      })
      .on("click", function (d) {
        tooltip.style("display", "none");
        if (self.drillthrough) {
          self.onDrillthrough.emit(d.data);
        }
      })
      .on("mousemove", function (d) {
        if (self.tooltip) {
          tooltip.style("left", d3.event.pageX + 10 + "px");
          tooltip.style("top", d3.event.pageY - 25 + "px");
          tooltip.style("display", "block");
          if (self.displaylabel.length > 0) {
            tooltip.html(
              self.displaylabel[0] +
                ": " +
                d.data[self.label[0]] +
                "<br>" +
                self.displayvalue[0] +
                ": " +
                d.data[self.value[0]]
            );
          } else {
            tooltip.html(
              self.label[0] +
                ": " +
                d.data[self.label[0]] +
                "<br>" +
                self.value[0] +
                ": " +
                d.data[self.value[0]]
            );
          }
        }
      })
      .on("mouseout", function (d) {
        if (self.tooltip) {
          tooltip.style("display", "none");
        }
      });

    path
      .enter()
      .append("text")
      .text(function (d) {
        if (d.data[self.value[0]] > 10) return d.data[self.value[0]] + "%";
      })
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ") rotate(-90)";
      })
      .style("text-anchor", "middle")
      .attr("dy", "0.15em")
      .style("fill", self.fontcolor ? self.fontcolor : "black")
      .style("font-size", self.fontsize);
  }
}
