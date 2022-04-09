import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SalesRatioComponent } from "../components/dashboard-components/sales-ratio/sales-ratio.component";
import { FeedsComponent } from "../components/dashboard-components/feeds/feeds.component";
import { TopSellingComponent } from "../components/dashboard-components/top-selling/top-selling.component";
import { TopCardsComponent } from "../components/dashboard-components/top-cards/top-cards.component";
import { BlogCardsComponent } from "../components/dashboard-components/blog-cards/blog-cards.component";
import { WorkspaceComponent } from "./workspace/workspace.component";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    SalesRatioComponent,
    FeedsComponent,
    TopSellingComponent,
    TopCardsComponent,
    BlogCardsComponent,
    WorkspaceComponent
  ],
})
export class DashboardModule {}
