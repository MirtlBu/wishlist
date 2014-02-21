var Colors = {
    color: [{back:"#E0A366", bord:"#D68533"}, {back:"#FFA347", bord:"#E68A2E"},
            {back:"#FF85C2", bord:"#FF5CAD"}, {back:"#70DB70", bord:"#47D147"},
            {back:"#4D94DB", bord:"#1975D1"}, {back:"#B280FF", bord:"#944DFF"},
            {back:"#5CB8E6", bord:"#478FB2"}, {back:"#66C2C2", bord:"#33ADAD"}],
    schuffle: function(randomcolor) {
        var counter = Colors.color.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = Colors.color[counter];
            Colors.color[counter] = Colors.color[index];
            Colors.color[index] = temp;
        }
        return Colors.color[randomcolor];
    }
};