import React, {Component} from 'react';
import {View} from 'react-native';

import MineSweeper from './screens/MineSweeper';

import * as Style from './assets/styles';

import Header from './components/Header';
import Picker from './components/Picker';

export default class Container extends Component {
  // TODO: Move all shared state vars except picker to
  // a redux store both here and in child components
  state = {
    rows: 5,
    columns: 5,
    mines: 5,
    difficulty: 'Easy',
    picker: false,
    clear: false,
  };

  toggle = () => {
    this.setState({
      picker: !this.state.picker,
    });
  };

  setDifficulty = (difficulty, reset) => {
    var rows = 0;
    var columns = 0;
    var mines = 0;
    if (difficulty === 'Easy') {
      rows = 5;
      columns = 5;
      mines = 5;
    } else if (difficulty === 'Medium') {
      rows = 10;
      columns = 10;
      mines = 25;
    } else if (difficulty === 'Hard') {
      rows = 20;
      columns = 20;
      mines = 100;
    }
    this.setState(
      {
        rows,
        columns,
        mines,
        difficulty,
        clear: !this.state.clear,
      },
      reset ? null : this.toggle,
    );
  };

  render() {
    const {rows, columns, mines, difficulty, picker, clear} = this.state;
    return (
      <View style={Style.app}>
        <Header
          open={this.toggle}
          clear={clear}
          difficulty={difficulty}
          onChange={this.setDifficulty}
          mines={mines}
        />
        <MineSweeper
          rows={rows}
          columns={columns}
          mines={mines}
          clear={clear}
          reset={() => this.setDifficulty(difficulty, true)}
        />
        {picker && (
          <Picker
            open={this.toggle}
            difficulty={difficulty}
            onChange={this.setDifficulty}
          />
        )}
      </View>
    );
  }
}
