var Colors = {
    color: ["#FFB240", "#FF9966", "#6E9E0D", "#33AD5C", "#33D6AD",
            "#66CCFF", "#D175FF" ,"#FF7ABD", "#47A3FF", "#599C9C",
            "#8585FF", "#4775A3", "#4C4CB8", "#80CC99", "#597ABD",
            "#7B68EE", "#6B8E23" ,"#FFAD5C", "#FF9C9C", "#73E373"],
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