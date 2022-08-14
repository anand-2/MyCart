function my_insect()
{
    var insectPos = [3,3];
    var insectDirection = "E";
    var Commands = "FFRFFRFRRF"

    for(let i=0;i<Commands.length;i++)
    {
        if(insectDirection === "N" && Commands.charAt(i) === "L" )
        {
            insectDirection = "W",
            insectPos[0]--
        }
        else if(insectDirection === "N" && Commands.charAt(i) === "F" )
        {
            insectPos[1]++
        }
        else if(insectDirection === "N" && Commands.charAt(i) === "R" )
        {
            insectDirection = "E",
            insectPos[0]++
        }

        else if(insectDirection === "S" && Commands.charAt(i) === "L" )
        {
            insectDirection = "E",
            insectPos[0]++
        }
        else if(insectDirection === "S" && Commands.charAt(i) === "F" )
        {
            insectPos[1]--
        }
        else if(insectDirection === "S" && Commands.charAt(i) === "R" )
        {
            insectDirection = "W",
            insectPos[0]--
        }

        else if(insectDirection === "E" && Commands.charAt(i) === "L" )
        {
            insectDirection = "N",
            insectPos[1]++
        }
        else if(insectDirection === "E" && Commands.charAt(i) === "F" )
        {
            insectPos[0]++
        }
        else if(insectDirection === "E" && Commands.charAt(i) === "R" )
        {
            insectDirection = "S",
            insectPos[1]--
        }

        else if(insectDirection === "W" && Commands.charAt(i) === "L" )
        {
            insectDirection = "S",
            insectPos[1]--
        }
        else if(insectDirection === "W" && Commands.charAt(i) === "F" )
        {
            insectPos[0]--
        }
        else if(insectDirection === "W" && Commands.charAt(i) === "R" )
        {
            insectDirection = "N",
            insectPos[1]++
        }
    }

    return "" + insectDirection +" " +  insectPos[0] + " " +  insectPos[1];

}

console.log(my_insect())