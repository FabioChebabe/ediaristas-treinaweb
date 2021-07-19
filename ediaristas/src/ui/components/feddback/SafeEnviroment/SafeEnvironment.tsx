import React from 'react';
import { SafeEnvironmentContainer } from './SafeEnvironment.style';
import { Container } from '@material-ui/core';

const SafeEnviroment = () => {
    return (
        <SafeEnvironmentContainer>
            <Container>
                Ambiente Seguro <i className={'twf-lock'} />
            </Container>
        </SafeEnvironmentContainer>
    );
}

export default SafeEnviroment;