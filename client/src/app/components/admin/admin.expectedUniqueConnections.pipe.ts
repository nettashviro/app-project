import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'expectedUniqueConnections'
})
export class AdminExpectedUniqueConnectionsPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round((value + 1) * 1.2);
  }
}
