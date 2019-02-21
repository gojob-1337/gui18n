import React, { FunctionComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { CardActionArea } from '@material-ui/core';

export type ProjectProps = {
  name: string;
  onClickHandler: () => void;
};

const Project: FunctionComponent<ProjectProps> = (props) => {
  const { onClickHandler, name } = props;
  return (
    <Card>
      <CardActionArea onClick={onClickHandler}>
        <CardContent>
          <Typography variant="h3">{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Project;
