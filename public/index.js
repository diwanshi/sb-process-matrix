require('angular-material/angular-material.min.css');
require('angular');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-material');

import {processMatrixComponent} from './sb-process-matrix/process_matrix.js';
import {DeliverablesService} from './common/deliverables.service.js';
import {DeliverableTaskComponent} from './components/deliverable-tasks/tasks.js';


class IndexController {
  constructor (sbDeliverables) {

    // dependencies
    this.sbDeliverables = sbDeliverables;

    // properties of vm
    this.deliverables = [];

    // init call
    this.sbDeliverables
        .fetchAll()
        .then(deliverables => this.deliverables = this.groupByParallelTasks(deliverables));
  }

  // Groups the parallel tasks in deliverable.activitiesWithSubTasks array
  groupByParallelTasks(deliverables) {
    return deliverables.map(deliverable => {
      deliverable.activitiesWithSubTasks = [];
      deliverable.activities.map(task => {
        // Filter activities based on each task's step value
        // Parallel tasks exists if filtered array length exceeds 1
        if (deliverable.activities.filter(activity => activity.step == task.step).length > 1) {
          deliverable.activitiesWithSubTasks[task.step] = deliverable.activities
            .filter(activity => activity.step == task.step)
            .map((el, index) => {
              // Assigning a subStep value based on index of map
              el.subStep = index + 1;
              return el;
            });
        } else {
          // For non-parallel tasks, assign filtered array directly
          deliverable.activitiesWithSubTasks[task.step] = deliverable.activities
            .filter(activity => activity.step == task.step);
        }
        return deliverable.activitiesWithSubTasks[task.step];
      });
      return deliverable;
    });
  }
}
IndexController.$inject = ['sbDeliverables'];

angular
    .module('theWholeApp', ['ngMaterial'])
    .factory('sbDeliverables', DeliverablesService)
    .component('sbProcessMatrix', processMatrixComponent)
    .component('sbDeliverableTask', DeliverableTaskComponent)
    .controller('IndexController', IndexController);