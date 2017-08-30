var ChessColor = {
  Black: "Black",
  White: "White"
}

class Position {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.toString = function () {
      return this.x + ", " + this.y;
    }

    this.equals = function (obj) {
      return this.x == obj.x && this.y == obj.y;
    }
  }
}

class Figure {
  constructor(color, position) {
    this.position = position;
    this.color = color;
    this.canMove = function () {
      return false;
    }
  }
}

class Pawn extends Figure {
  constructor(color, position) {
    super(color, position);
    this.canMove = function(position) {
      var deltaY = position.y - this.position.y;
      if(position.x != this.position.x)
      {
        return false;
      }
      if(this.color == ChessColor.Black && deltaY == -1)
      {
        return true;
      }

      if (this.color == ChessColor.White && deltaY == 1)
      {
        return true;
      }

      return false;
    }

    this.toString = function() {
      return "I am Pawn on position " + this.position + ".";
    }
  }
}

class King extends Figure {
  constructor(color, position) {
    super(color, position);
    this.canMove = function(position) {
      var deltaX = Math.abs(position.x - this.position.x);
      var deltaY = Math.abs(position.y - this.position.y);

      if ((deltaX == 1) && (deltaY == 1))
        return true;

      if ((deltaX == 1) && (position.y == this.position.y))
        return true;

      if ((deltaY == 1) && (position.x == this.position.x))
        return true;

      return false;
    }

    this.toString = function() {
      return "I am King on position " + this.position + ".";
    }
  }
}

class Castle extends Figure {
  constructor(color, position) {
    super(color, position);
    this.canMove = function(position) {
      return position.x == this.position.x || position.y == this.position.y;;
    }

    this.toString = function() {
      return "I am Castle on position " + this.position + ".";
    }
  }
}

class Bishop extends Figure {
  constructor(color, position) {
    super(color, position);
    this.canMove = function(position) {
      var checkedPosition = new Position(this.position.x, this.position.y);
      while(checkedPosition.x < 8 && checkedPosition.y < 8) {
        checkedPosition.x++;
        checkedPosition.y++;
        if (position.equals(checkedPosition))
          return true;
      }

      checkedPosition = new Position(this.position.x, this.position.y);
      while(checkedPosition.x >= 0 && checkedPosition.y < 8) {
        checkedPosition.x--;
        checkedPosition.y++;
        if (position.equals(checkedPosition))
          return true;
      }

      checkedPosition = new Position(this.position.x, this.position.y);
      while (checkedPosition.x < 8 && checkedPosition.y >= 0) {
        checkedPosition.x++;
        checkedPosition.y--;
        if (position.equals(checkedPosition))
          return true;
      }

      checkedPosition = new Position(this.position.x, this.position.y);
      while (checkedPosition.x >= 0 && checkedPosition.y >= 0) {
        checkedPosition.x--;
        checkedPosition.y--;
        if (position.equals(checkedPosition))
          return true;
      }

      return false;
    }

    this.toString = function() {
      return "I am Bishop on position " + this.position + ".";
    }
  }
}
