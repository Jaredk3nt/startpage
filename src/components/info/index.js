import React from 'react';
import styled from '@emotion/styled';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function pad(str) {
    const s = str + '';
    return s.padStart(2, '0');
}

function Info({}) {
    const date = new Date();
    const day = days[date.getDay()];
    const dateString = `, ${months[date.getMonth()]} ${date.getDate()}`
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return (
        <InfoStyles>
            <DateStyles fs='1rem'><span className='accented'>{day}</span>{dateString}</DateStyles>
            <DateStyles m='0em'>{hours}<span className='muted'>:</span>{minutes}</DateStyles>
        </InfoStyles>
    );
}

const InfoStyles = styled('section')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DateStyles = styled('h2')`
    margin: ${p => p.m || '.25em'};
    font-size: ${p => p.fs || '2.5rem'};

    color: ${p => p.theme.fg};
    font-family: ${p => p.theme.font.family};
    font-weight: ${p => p.theme.font.regular};

    .accented {
        color: ${p => p.theme.accent};
    }

    .muted {
        opacity: .5;
        margin: 0px 4px;
    }
`;

export default Info;
