import React, { FunctionComponent } from 'react';

import { observer } from 'mobx-react-lite';

import { Redirect } from 'react-router';
import { useStore } from '../../store';

const BranchSwitcher: FunctionComponent = observer(() => {
  const { selectedProject } = useStore();

  if (!selectedProject) {
    return <Redirect to="/" />;
  }

  return <div>Selected project: {selectedProject.name}</div>;
});

export default BranchSwitcher;
