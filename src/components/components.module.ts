import { NgModule } from '@angular/core';
import { PagemoveComponent } from './pagemove/pagemove';
import { GlobalComponent } from './global/global';
@NgModule({
	declarations: [PagemoveComponent,
    GlobalComponent],
	imports: [],
	exports: [PagemoveComponent,
    GlobalComponent]
})
export class ComponentsModule {}
