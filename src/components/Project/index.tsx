import React, { FunctionComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Project as ProjectType } from 'gitlab';

export type ProjectProps = {
  name: string;
};

const Project: FunctionComponent<ProjectProps> = (props) => {
  const { name } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default Project;
