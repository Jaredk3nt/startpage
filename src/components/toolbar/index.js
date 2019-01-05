import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Transition } from 'react-spring';
import shortid from 'shortid';

import Button from '../button';
import Flex from '../flex';

const modes = { COLOR_PICKER: 'color', ADD: 'add' };
const themeModes = { DARK: 'dark', LIGHT: 'light' };

class Toolbar extends Component {
    state = {
        mounted: false,
        open: false,
        mode: modes.COLOR_PICKER,
        label: '',
        url: ''
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ mounted: true });
        }, 200)
    }

    toggleOpen = mode => {
        if (this.state.open) {
            const changing = mode && mode !== this.state.mode;
            return this.setState({
                open: false,
                mode: mode,
                label: '',
                url: '',
            }, () => {
                if (changing) this.setState(ps => ({ open: !ps.open }));
            })
        }
        return this.setState(ps => ({
            open: true,
            mode: mode,
        }));
    }

    panelContent = () => {
        const { mode, label, url } = this.state;
        if (mode === modes.COLOR_PICKER) {
            return <ColorSelectorPanel colors={this.props.colors} onClick={(color) => {
                this.props.changeAccent(color);
                this.toggleOpen();
            }} />
        }
        if (mode === modes.ADD) {
            return (
                <LinkForm
                    url={url}
                    label={label}
                    updateLabel={val => this.setState({ label: val })}
                    updateLink={val => this.setState({ url: val })}
                    cancel={() => this.toggleOpen()}
                    add={() => {
                        if (label && url) {
                            this.props.addLink({ label, url, id: shortid.generate() });
                            this.toggleOpen();
                        }
                    }}
                />
            );
        }
    }

    render() {
        const { open, mode, mounted } = this.state;
        
        return (
            <>
                <Transition
                    items={open}
                    from={{ height: 0, opacity: 0 }}
                    enter={{ height: (mode === modes.COLOR_PICKER ? 80 : 200), opacity: 1 }}
                    leave={{ height: 0, opacity: 0 }}
                >
                    {show => show && (
                        props => (
                            <HiddenPanel style={props}>
                                {this.panelContent()}
                            </HiddenPanel>
                        )
                    )}
                </Transition>
                <Transition
                    items={mounted}
                    from={{ transform: 'translate3d(0,60px,0)' }}
                    enter={{ transform: 'translate3d(0,0px,0)' }}
                    leave={{ transform: 'translate3d(0,60px,0)' }}
                >
                    {show => show && (
                        props => (
                            <ToolbarStyles style={props}>
                                <Flex>
                                    <ColorButton onClick={() => this.toggleOpen(modes.COLOR_PICKER)}/>
                                    <Button m='0em 0em 0em .5em' onClick={this.props.toggleMode}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill={this.props.mode === themeModes.DARK ? 'white' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                    </Button>
                                </Flex>
                                
                                <Flex>
                                    <Button fs='.8rem' pad='1em 2em' m='0em 1em 0em 0em'onClick={this.props.toggleEdit}>EDIT</Button>
                                    <Button fs='.8rem' pad='1em 2em' onClick={() => this.toggleOpen(modes.ADD)}>ADD</Button>
                                </Flex>
                            </ToolbarStyles>
                        )
                    )}
                </Transition>
            </>
        );
    }
}

function ColorSelectorPanel({ colors, onClick }) {
    return (
        <ColorPicker>
            {colors.map(color => (
                <ColorButton color={color} onClick={() => onClick(color)} key={color} />
            ))}
        </ColorPicker>
    );
}

function LinkForm({ updateLabel, updateLink, label, url, cancel, add }) {
    return (
        <AddForm>
            <AddInput
                placeholder='Bookmark Name'
                onChange={e => updateLabel(e.target.value)}
            />
            <AddInput
                placeholder='Bookmark Link'
                onChange={e => updateLink(e.target.value)}
            />
            <AddFormButtons>
                <Button
                    w='100%'
                    m='0em .5em 0em 0em'
                    type='button'
                    onClick={cancel}
                >
                    CANCEL
                </Button>
                <Button
                    primary
                    w='100%'
                    type='button'
                    onClick={add}
                >
                    ADD
                </Button>
            </AddFormButtons>
        </AddForm>
    );
}

function ColorButton({ color, onClick }) {
    return (
        <Button h='100%' onClick={onClick}>
            <AccentMarker color={color} />
        </Button>
    );
}

const ToolbarStyles = styled('nav')`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: .5em;

    box-shadow: ${p => p.theme.shadow};
    height: calc(${p => p.theme.size.toolbar}px + 1em);
    background-color: ${p => p.theme.bg};
`;

const HiddenPanel = styled('div')`
    width: 100%;
    position: absolute;
    bottom: calc(${p => p.theme.size.toolbar}px + 1em);
    left: 0;
    background-color: ${p => p.theme.bg_tertiary};
`;

const AccentMarker = styled('div')`
    height: ${p => p.theme.size.toolbar / 2}px;
    width: ${p => p.theme.size.toolbar / 2}px;
    border-radius: 100%;

    background-color: ${p => p.color || p.theme.accent};
`;

const ColorPicker = styled('div')`
    display: flex;
    width: 100%;
    overflow-y: scroll;
    flex-wrap: nowrap;
    padding: 15px .5em;

    button {
        margin-right: 5px;
    }
`;

const AddForm = styled('form')`
    width: 100%;
    height: 100%;
    padding: 1em;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
`;

const AddInput = styled('input')`
    margin: .5em 0em;
    border: none;
    outline: none;
    border-radius: 4px;
    font-size: 1rem;
    padding-left: 1em;

    color: ${p => p.theme.fg};
    background-color: ${p => p.theme.bg_secondary};
    font-family: ${p => p.theme.font.family};
`;

const AddFormButtons = styled('div')`
    display: flex;
    justify-content: space-between;
    padding: .5em 0em;
`;


export default Toolbar;