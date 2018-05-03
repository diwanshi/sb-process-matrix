import componentTemplate from './tasks.html';
import componentStyle from './tasks.less';

import { DeliverableTaskController } from './tasks.controller.js';

const bindings = {
    sbTask: '<',
    sbTaskActions: '<'
};

export const DeliverableTaskComponent = {
    controller: DeliverableTaskController,
    template: componentTemplate,
    bindings: bindings
};