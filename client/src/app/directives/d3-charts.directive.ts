import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import * as d3 from "d3";

interface Config {
  height: number;
  width: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  innerRadius?: number;
  length?: number;
  transitionSpeed?: number;
  lineOpacity?: number;
  lineOpacityHover?: number;
  lineStroke?: string;
  lineStrokeHover?: string;
  otherLinesOpacityHover?: number;
  circleOpacity?: number;
  circleOpacityOnLineHover?: number;
  circleRadius?: number;
  circleRadiusHover?: number;
}

@Directive({ selector: "[d3-charts]" })
export class D3ChartsDirective {
  /**
   * @param type            String          Type of chart
   * @param config          Config Object   Chart configuration includes dimensions
   * @param data            Array           Chart data
   * @param color           Array           Chart color
   * @param fontcolor       String          Chart font color
   * @param fontsize        String          Chart font size
   * @param drillthrough    Boolean         Drillthrough is applicable or not
   * @param tooltip         Boolean         Want tooltip or not
   * @param tooltipstyle    Object          Tooltip css
   * @param label           Array           x-Axis labels array for data array
   * @param value           String          y-Axis for data array
   * @param displaylabel    Array           Display name array in tooltip for x-Axis
   * @param displayvalue    String          Display name in tooltip for y-Axis
   * @param showX           Boolean         Show X-Axis or not
   * @param showY           Boolean         show Y-Axis or not
   * @param onDrillthrough  EventEmitter    Sends data to parent component
   */
  @Input("name") name: string;
  @Input("type") type: string;
  @Input("config") config: Config;
  @Input("data") data: Array<any> = [];
  @Input("color") color: Array<string> = [];
  @Input("fontcolor") fontcolor: string;
  @Input("fontsize") fontsize: any;
  @Input("drillthrough") drillthrough: Boolean = false;
  @Input("tooltip") tooltip: Boolean = false;
  @Input("tooltipstyle") tooltipstyle: Boolean = false;
  @Input("label") label: Array<string> = [];
  @Input("value") value: Array<string> = [];
  @Input("displaylabel") displaylabel: Array<string> = [];
  @Input("displayvalue") displayvalue: Array<string> = [];
  @Input("showX") showX: Boolean = false;
  @Input("showY") showY: Boolean = false;
  @Output() onDrillthrough = new EventEmitter();
  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.data.length > 0) {
      switch (this.type) {
        case "pie":
          this.redraw();
          break;
        case "bar":
          this.redraw();
          break;
        default:
          throw new Error("Invalid chart type");
      }
    }
  }

  /**
   * Tooltip
   */
  public toolTip() {
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    for (let key in this.tooltipstyle) {
      tooltip.style(key, this.tooltipstyle[key]);
    }
    return tooltip;
  }

  redraw() {
    return;
  }

  /**
   * For Pie Chart
   */
  pieChart(config) {
    const self = this;
    var tooltip = this.toolTip();
    var height = config.height,
      width = config.width,
      radius = Math.min(height, width) / 2;
    const svg = d3
      .select(this.el.nativeElement)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(90)`);
    const color = d3.scaleOrdinal(this.color);

    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const path = svg.selectAll("path").data(pie(this.data));

    path.transition().duration(200).attrTween("d", this.arcTween);

    path
      .enter()
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .each(function (d) {
        this._current = d;
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
      .style("fill", this.fontcolor ? this.fontcolor : "black")
      .style("font-size", self.fontsize);
  }
}
