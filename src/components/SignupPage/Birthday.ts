export class Birthday {
    private day: number;
    private month: number;
    private year: number;
  
    constructor(day: number, month: number, year: number) {
      this.day = day;
      this.month = month;
      this.year = year;
    }
  
    getDay(): number {
      return this.day;
    }
  
    getMonth(): number {
      return this.month;
    }
  
    getYear(): number {
      return this.year;
    }
  
    setDay(day: number): void {
      this.day = day;
    }
  
    setMonth(month: number): void {
      this.month = month;
    }
  
    setYear(year: number): void {
      this.year = year;
    }
  
    toString(): string {
      return `${this.day}/${this.month}/${this.year}`;
    }
  }