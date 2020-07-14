export default class MineSweeper {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
  }

  surrounding = [
    [+1, 0],
    [-1, 0],
    [0, +1],
    [0, -1],
    [-1, -1],
    [-1, +1],
    [+1, +1],
    [+1, -1],
  ];

  random = (minVal, maxVal) => {
    let min = Math.ceil(minVal);
    let max = Math.floor(maxVal);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  draw = () => {
    const tiles = [];
    const components = [];
    const rows = this.rows;
    const columns = this.columns;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (typeof tiles[j] === 'undefined') {
          tiles[j] = [];
          components[j] = [];
        }
        if (typeof tiles[j][i] === 'undefined') {
          tiles[j][i] = {
            value: 0,
            display: 'hide',
            flag: false,
          };
          components[j][i] = null;
        }
      }
    }
    return {tiles, components};
  };

  expand = (x, y, allTiles) => {
    let tiles = {...allTiles};
    const rows = this.rows;
    const columns = this.columns;
    if (x < 0 || x > columns - 1 || y < 0 || y > rows - 1) {
      return tiles;
    }

    if (tiles[x][y].value === 0 && tiles[x][y].display !== 'show') {
      tiles = this.reveal(x, y, tiles);
      this.surrounding.map((coord) => {
        const newX = x + coord[0];
        const newY = y + coord[1];
        if (newX < 0 || newX > columns - 1 || newY < 0 || newY > rows - 1) {
          return;
        }
        if (tiles[newX][newY].value === 'mine') {
          return;
        } // Stop once a mine is detected
        tiles = this.expand(newX, newY, tiles);
      });
    } else {
      tiles = this.reveal(x, y, tiles);
    }
    return tiles;
  };

  reveal = (x, y, allTiles) => {
    const tiles = {...allTiles};
    tiles[x][y].display = 'show';
    tiles[x][y].flag = false;
    return tiles;
  };

  mark = (x, y, allTiles) => {
    // Mark surrounding vicinity
    const tiles = {...allTiles};
    const rows = this.rows;
    const columns = this.columns;
    // MUST only have 1 bomb on a tile
    if (tiles[x][y].value === 'mine') {
      return tiles;
    }
    tiles[x][y].value = 'mine';

    this.surrounding.map((coord) => {
      let newX = x + coord[0];
      let newY = y + coord[1];

      if (newX < 0 || newX > columns - 1 || newY < 0 || newY > rows - 1) {
        return;
      }

      if (tiles[newX][newY].value !== 'mine') {
        tiles[newX][newY].value++;
      }
    });
    return tiles;
  };
}
