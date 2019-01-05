import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { Trail } from 'react-spring';

import Button from './components/button';
import Info from './components/info';
import Toolbar from './components/toolbar';

import theme from './theme';

const STORAGE_KEY = 'danggoodcode-theme-storage';
const modes = { DARK: 'dark', LIGHT: 'light' };
const colors = ['#ECBD51', '#bc4056', '#d99ac5', '#f18f01', '#83A06C', '#7cea9c', '#7289DA', '#224a5e', '#7b63b2', '#fff', '#111'];

class App extends Component {
  state = {
    mode: modes.LIGHT,
    accent: colors[0],
    links: [],
    edit: false
  };

  componentDidMount() {
    const store = localStorage.getItem(STORAGE_KEY);
    if (store) {
      this.setStateFromStore(JSON.parse(store));
    }
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
  }

  setStateFromStore = (store) => {
    this.setState({
      mode: store.mode || modes.DARK,
      accent: store.accent|| colors[0],
      links: store.links || []
    })
  }

  updateStore = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...this.state
    }));
  }

  changeAccent = (accent) => this.setState({ accent }, () => this.updateStore());

  addLink = (link) => this.setState(ps => ({ links: [link, ...ps.links] }), () => this.updateStore());

  removeLink = (id) => {
    const newLinks = this.state.links.filter(link => link.id !== id);
    this.setState({ links: newLinks }, () => this.updateStore());
  }

  render() {
    const { mode, links, accent, edit } = this.state;

    return (
      <ThemeProvider theme={{ ...theme[mode], accent}}>
        <Global styles={GlobalStyles} />
        <StartPage>
          <Info />
          <LinksList>
            <Trail
              items={links}
              keys={item => item.id}
              from={{
                transform: 'translate3d(-40px, 0,0)',
                opacity: '0'
              }}
              to={{
                transform: 'translate3d(0px,0,0)',
                opacity: '1'
              }}
            >
              {item => props =>  (
                <div style={{ ...props, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <LinkButton edit={edit} href={item.url} radius={edit ? '4px 0px 0px 4px' : '4px'}>{item.label}</LinkButton>
                    <Button
                      primary
                      style={{ position: 'absolute', right: '0px', zIndex: -1 }}
                      radius='0px 4px 4px 0px'
                      w='25%'
                      fs='.95rem'
                      onClick={() => this.removeLink(item.id)}
                    >DELETE</Button>
                </div>
              )}
            </Trail>
          </LinksList>
          <Toolbar
            changeAccent={this.changeAccent}
            toggleEdit={() => this.setState(ps => ({ edit: !ps.edit }))}
            toggleMode={() => this.setState(ps => ({ mode: ps.mode === modes.DARK ? modes.LIGHT : modes.DARK }))}
            addLink={this.addLink}
            colors={colors}
            mode={mode}
          />
        </StartPage>
      </ThemeProvider>
    );
  }
}

const GlobalStyles = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #root {
    width: 100vw;
    height: 100vh;
  }
`;

const StartPage = styled('div')`
  width: 100%;
  height: 100%;
  padding-top: 1em;
  background-color: ${p => p.theme.bg};
  display: grid;
  grid-template-rows: 25% 1fr calc(${p => p.theme.size.toolbar}px + 1em);
`;

const LinksList = styled('section')`
  padding: 0em 1em;
  height: 100%;
  overflow: scroll;
`;

function LinkButton({ children, edit, ...rest }) {
  return (
    <Button
      w={ edit ? '75%' : '100%'}
      m='.5em 0em'
      justify='flex-start'
      as='a'
      target='_blank'
      accent
      {...rest}
    >
      {children}
    </Button>
  )
}

export default App;
