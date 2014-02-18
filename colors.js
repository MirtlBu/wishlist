var Colors = {
    color: ["#00FFFF", "#EE82EE", "#0000FF", "#8A2BE2", "#DEB887", "#FF7F50", "#6495ED" ,"#FF8C00", "#2F4F4F", "#00CED1",
        "#FF1493", "#228B22", "#FFD700", "#00FF00", "#778899", "#7B68EE", "#6B8E23" ,"#FF4500", "#FF0000", "#00FF7F"],
    schuffle: function(randomcolor) {
        debugger;
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