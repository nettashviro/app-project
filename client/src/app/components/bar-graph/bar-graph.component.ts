import { Component, OnInit } from "@angular/core";
import { ConnectionsService } from "src/app/services/connections.service";

@Component({
  selector: "app-bar-graph",
  templateUrl: "./bar-graph.component.html",
  styleUrls: ["./bar-graph.component.css"],
})
export class BarGraphComponent implements OnInit {
  /**
   * For Bar Chart
   */
  barConfig = {
    height: 200,
    width: 200,
    top: 20,
    right: 5,
    bottom: 25,
    left: 0,
  };
  name = "מספר מתחברים";
  xName = "_id";
  yName = "count";
  barData = [];
  barColors = ["#99ccff"];
  barLabels = ["_id"];
  barDisplayLabels = ["year"];
  barValue = ["count"];
  barDisplayValue = ["Value"];

  constructor(private connectionsService: ConnectionsService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.connectionsService.getConnectionByDate().subscribe((items) => {
      this.barData = items;
    });
  }
}
