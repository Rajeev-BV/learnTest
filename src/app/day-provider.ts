import { WeekDay } from "@angular/common";

export interface DayProvider {
    getDayOfTheWeek : () => WeekDay     
    
}
