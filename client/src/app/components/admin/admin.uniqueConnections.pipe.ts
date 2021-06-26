import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'uniqueConnections'
})
export class AdminUniqueConnectionsPipe implements PipeTransform {
  transform(value: number): string {
    return `approximately ${value} unique connections`;
  }
}
