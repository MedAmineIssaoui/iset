import { Component, OnInit } from '@angular/core';
import { FormationService } from '../service/formation.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorizedFormations: any[] = [];

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.formationService.getFormation().subscribe((data) => {
      const groupedFormations = this.groupByCategory(data);
      this.categorizedFormations = this.firstTwo(groupedFormations);
    });
  }

  private groupByCategory(formations: any[]): any {
    return formations.reduce((acc, formation) => {
      const categories = formation.categories || []; 
      categories.forEach((category: string) => { 
        acc[category] = acc[category] || [];
        acc[category].push(formation);
      });
      return acc;
    }, {});
  }

  private firstTwo(groupedFormations: any): any[] {
    const result = [];
    for (const category in groupedFormations) {
      if (groupedFormations.hasOwnProperty(category)) {
        const formationsInCategory = {
          category: category,
          formations: groupedFormations[category].slice(0,2)
        };
        result.push(formationsInCategory);
      }
    }
    return result;
  }
}





