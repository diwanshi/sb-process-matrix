import { DeliverablesService } from '../../common/deliverables.service';

class DeliverableTaskController {

    constructor($timeout, sbDeliverables) {
        this.$timeout = $timeout;
        this.sbDeliverables = sbDeliverables;
        this.sbTaskError = false;
        this.taskStatus = [
            {
                status: 'To Do',
                progress: 0,
            },
            {
                status: 'In Progress',
                progress: 50,
            },
            {
                status: 'Done',
                progress: 100,
            }
        ];
    }

    $onInit() {
        console.log('input bindings are defined!');
    }

    // Updates the task progress to selected status
    updateTaskProgress(task) {
        const updatedProgress = this.progress;
        return this.sbDeliverables.changeTaskProgress(task, updatedProgress)
            .catch(() => {
                this.sbTaskError = true;
                this.$timeout(() => {
                    this.sbTaskError = false;
                }, 2000)
            });
    }
}

DeliverableTaskController.$inject = ['$timeout', 'sbDeliverables'];

export { DeliverableTaskController }