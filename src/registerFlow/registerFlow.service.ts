import { Injectable }         from '@angular/core';
import { STEPS }              from './registerFlow.model';

@Injectable()
export class RegisterFlowService {
    private registerflow = [
        { step: STEPS.Personal, valid: false },
        { step: STEPS.FacePhoto, valid: false },
        { step: STEPS.Rider, valid: false },
        { step: STEPS.DriverPref, valid: false },
        { step: STEPS.Bank, valid: false },
        { step: STEPS.DriverInfo, valid: false }
    ];
    
    validateStep(step: string) {
        // If the state is found, set the valid field to true 
        var found = false;
        for (var i = 0; i < this.registerflow.length && !found; i++) {
            if (this.registerflow[i].step === step) {
                found = this.registerflow[i].valid = true;
            }
        }
    }

    resetSteps() {
        // Reset all the steps in the Workflow to be invalid
        this.registerflow.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string) : string {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.registerflow.length && !found && valid; i++) {
            let item = this.registerflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;
    }
}