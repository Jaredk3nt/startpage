import styled from '@emotion/styled';

const Flex = styled('div')`
    display: flex;
    
    justify-content: ${p => p.justify || 'center'};
    align-items: ${p => p.align || 'center'};
`;

export default Flex;