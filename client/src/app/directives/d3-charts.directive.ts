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
}
