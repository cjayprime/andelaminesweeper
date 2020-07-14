import React, {Component} from 'react';
import {TouchableWithoutFeedback, View, Text, Image} from 'react-native';

import {flag, mine} from '../../assets/images';
import * as Style from '../../assets/styles';

import {MineSweeper} from '../../utils';

export default class Tiles extends Component {
  state = {
    x: 0,
    y: -1,
    columns: 0,
    rows: 0,
    mines: 0, // Total mines
    size: 0, // Size of a tile based on difficulty
    tiles: [], // All tiles - Shape is: { value: /*'mine', Number*/,display: /*'hide', 'show'*/, flag: BOOLEAN,}
  };

  minesweeper;

  components = [];

  componentDidMount() {
    const {rows, columns, mines, size} = this.props;
    /* eslint-disable react/no-did-mount-set-state */
    this.setState(
      {
        rows,
        columns,
        mines,
        size,
      },
      () => this.init(rows, columns),
    );
  }

  componentDidUpdate(prevProps) {
    const {rows, columns, mines, size, clear} = this.props;
    if (prevProps.rows !== rows || prevProps.columns !== columns) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState(
        {
          rows,
          columns,
          mines,
          size,
        },
        () => this.init(rows, columns),
      );
    } else if (prevProps.clear !== clear) {
      this.init(rows, columns);
    }
  }

  init = (rows, columns) => {
    let {mines} = this.state;
    this.minesweeper = new MineSweeper(rows, columns);
    const {tiles, components} = this.minesweeper.draw();
    let newTiles = tiles;
    this.components = components;

    // Set mines
    let count = 0;
    while (count < mines) {
      count++;
      var x = this.minesweeper.random(0, columns - 1);
      var y = this.minesweeper.random(0, rows - 1);
      newTiles = this.minesweeper.mark(x, y, newTiles);
    }

    this.setState({tiles: newTiles});
  };

  handleClick = (x, y) => {
    const {tiles} = {...this.state};
    const components = this.components;
    if (tiles[x][y].display !== 'show' && components) {
      this.setState(
        {
          x,
          y,
        },
        () => {
          components[x][y].measure((fx, fy, width, height, px, py) => {
            const {popover} = this.props;
            popover({
              width,
              height,
              px,
              py,
              dig: () => this.dig(x, y),
              flag: () => this.flag(x, y),
            });
          });
        },
      );
    }
  };

  flag = (x, y) => {
    const {tiles} = {...this.state};
    tiles[x][y].flag = !tiles[x][y].flag;
    this.setState({
      tiles,
    });
  };

  restart = () => {
    var {rows, columns, tiles} = {...this.state};
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        (function (x, y) {
          if (tiles[x][y].value === 'mine') {
            tiles = this.minesweeper.reveal(x, y, tiles);
          }
        }.apply(this, [j, i]));
      }
    }
    this.setState(
      {
        tiles,
      },
      () =>
        setTimeout(() => {
          this.init(rows, columns);
        }, 2000),
    );
  };

  dig = (x, y) => {
    var {tiles, columns, rows} = {...this.state};
    var newTiles = [];

    if (tiles[x][y].flag === false) {
      if (tiles[x][y].value === 'mine') {
        // A bomb was clicked
        this.props.lose();
        // Refresh game
        this.restart();
        return;
      } else if (tiles[x][y].value === 0) {
        // A zero/empty space was clicked
        newTiles = this.minesweeper.expand(x, y, tiles);
      } else {
        // A number was clicked
        newTiles = this.minesweeper.reveal(x, y, tiles);
      }

      this.setState(
        {
          tiles: newTiles,
        },
        () => {
          let unRevealedTiles = 0;
          for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
              if (
                newTiles[j][i].display !== 'show' &&
                newTiles[j][i].value !== 'mine'
              ) {
                unRevealedTiles++;
              }
            }
          }
          if (unRevealedTiles === 0) {
            this.props.won();
          }
        },
      );
    } else {
      tiles[x][y].flag = false;
    }
  };

  render() {
    const board = [];
    let color = false;
    var {top, left} = this.props;
    var {tiles, rows, columns, x, y, size} = this.state;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (
          typeof tiles[j] !== 'undefined' &&
          typeof tiles[j][i] !== 'undefined'
        ) {
          (function (a, b) {
            if (a !== 0 && columns % 2 === 0) {
              color = !color;
            } else if (columns % 2 !== 0) {
              color = !color;
            }
            const isSet =
              tiles[a][b].value === 'mine'
                ? false
                : tiles[a][b].display === 'show';
            const style = {
              width: size,
              height: size,
              borderWidth: top >= 0 && left >= 0 && a === x && b === y ? 3 : 0,
              backgroundColor: isSet
                ? color
                  ? '#A6ACB3'
                  : '#79838D'
                : color
                ? '#1430B7'
                : '#345BE4',
            };
            board.push(
              <TouchableWithoutFeedback
                key={a + ' - ' + b}
                onPress={() => this.handleClick(a, b)}>
                <View
                  ref={(view) => {
                    this.components[a][b] = view;
                  }}
                  style={[Style.tiles.container, style]}>
                  {tiles[a][b].flag === true ? (
                    <Image source={flag} style={Style.tiles.image} />
                  ) : tiles[a][b].display === 'show' &&
                    tiles[a][b].value === 'mine' ? (
                    <Image source={mine} style={Style.tiles.image} />
                  ) : (
                    tiles[a][b].display === 'show' &&
                    tiles[a][b].value > 0 && (
                      <Text style={Style.tiles.text}>{tiles[a][b].value}</Text>
                    )
                  )}
                </View>
              </TouchableWithoutFeedback>,
            );
          }.apply(this, [j, i]));
        }
      }
    }
    return board;
  }
}
