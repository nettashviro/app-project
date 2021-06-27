import { Component, OnInit } from "@angular/core";
import { ConnectionsService } from "src/app/services/connections.service";

@Component({
  selector: "app-pie-graph",
  templateUrl: "./pie-graph.component.html",
  styleUrls: ["./pie-graph.component.css"],
})
export class PieGraphComponent implements OnInit {
  /**
   * For Pie Chart
   */
  pieConfig = {
    height: 50,
    width: 50,
  };
  pieData = [
    { region: "shoes", count: "6" },
    { region: "tshirt", count: "8" },
    { region: "Incomplete", count: "8" },
  ];
  pieColors = ["#99ccff", "#98ccff", "#00000"];
  pieLabels = ["region"];
  pieDisplayLabels = ["Region"];
  pieValue = ["count"];
  pieDisplayValue = ["Count"];

  name = "מספר מתחברים";
  barData = [];

  constructor(private connectionsService: ConnectionsService) {}

  // ngOnInit() {
  //   this.fetchData();
  // }

  // fetchData() {
  //   this.connectionsService.getConnectionByDate().subscribe((items) => {
  //     this.barData = items;
  //   });
  // }
}
