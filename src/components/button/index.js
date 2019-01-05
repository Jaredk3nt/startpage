import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = styled('button')`
    border: none;
    text-decoration: none;
    display: block;

    display: flex;
    align-items: center;
    
    width: ${p => p.w || 'auto'};
    height: ${p => p.h || 'auto'};
    padding: ${p => p.pad || '1em'};
    margin: ${p => p.m || '0em'};
    border-radius: ${p => p.radius || '4px'};
    justify-content: ${p => p.justify || 'center'};
    font-size: ${p => p.fs || '1rem'};

    color: ${p => p.theme.fg};
    background-color: ${p => p.theme.bg_secondary};
    font-family: ${p => p.theme.font.family};
    font-weight: ${p => p.theme.font.regular};

    &:hover {
        cursor: pointer;
    }

    ${p => {
        return p.accent ? `
            border-left: 10px solid ${p.theme.accent};
        ` : '';
    }}

    ${p => p.primary && `background-color: ${p.theme.accent};`}

    transition: width .5s ease;
`;

Button.propTypes = {
    h: PropTypes.string,        // height
    w: PropTypes.string,        // width
    m: PropTypes.string,        // margin
    pad: PropTypes.string,      // padding
    radius: PropTypes.string,   // border-radius
    justify: PropTypes.string,  // justify-content
}


export default Button;