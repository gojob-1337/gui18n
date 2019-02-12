import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import createUseAxios from '../hooks/useAxios';

const useProjectList = createUseAxios((token?: string) => (
    {
        url: 'https://gitlab.com/api/v4/projects',
        headers: { Authorization: `Bearer ${token}` },
        params: { membership: true },
    }),
);
type ProjectListProps = { token?: string };

const ProjectList: FunctionComponent<ProjectListProps> = (props) => {
    const {data, loading, error} = useProjectList(props.token);
    return <div>{JSON.stringify(data)}</div>;
};

const mapStateToProps = (state: any) => {
    return { token: state.token };
};

export default connect(mapStateToProps)(ProjectList);
