'use strict';

class Node {
  constructor(xCoord, yCoord, count, position) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.count = count;
    this.position = position;
  }

  getPosition() {
    return `${this.xCoord}, ${this.yCoord}`;
  }
}

const knightMoves = ([startXCoord, startYCoord], [endXCoord, endYCoord]) => {
  const queue = [];
  const gameBoard = [];
  const startNode = new Node(startXCoord, startYCoord, 0, [
    [startXCoord, startYCoord],
  ]);
  queue.push(startNode);

  while (queue.length > 0) {
    const node = queue.shift();
    const { xCoord, yCoord, count, position } = node;

    if (xCoord === endXCoord && yCoord === endYCoord) {
      return resultMsg(count, position);
    }
    gameBoard.push(node.getPosition());

    for (const variant of getVariants(xCoord, yCoord)) {
      const [variantXCoord, variantYCoord] = variant;
      const variantNode = new Node(variantXCoord, variantYCoord, count + 1, [
        ...position,
        [variantXCoord, variantYCoord],
      ]);

      if (!gameBoard.includes(variantNode.getPosition())) {
        queue.push(variantNode);
      }
    }
  }
};

const getVariants = (xCoord, yCoord) => {
  const variants = [];

  const availableMoves = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
  ];

  for (const availableMove of availableMoves) {
    const [xCoordChange, yCoordChange] = availableMove;

    const variantXCoord = xCoord + xCoordChange;
    const variantYCoord = yCoord + yCoordChange;

    if (
      variantXCoord >= 0 &&
      variantXCoord <= 7 &&
      variantYCoord >= 0 &&
      variantYCoord <= 7
    ) {
      variants.push([variantXCoord, variantYCoord]);
    }
  }
  return variants;
};

const resultMsg = (count, position) => {
  let message;
  if (count === 1) {
    message = `It took ${count} step! Shortest path is: ${position.join(
      ' -> '
    )}`;
  } else {
    message = `It took ${count} steps! Shortest path is: ${position.join(
      ' -> '
    )}`;
  }
  return message;
};

console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([1, 2], [4, 4]));
console.log(knightMoves([5, 2], [0, 0]));
console.log(knightMoves([3, 2], [4, 3]));
console.log(knightMoves([0, 0], [7, 7]));
