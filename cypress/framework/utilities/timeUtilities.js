let TimeUtilities = function () {

    this.getCurrentTimeStamp = function()
    {
        var sToday = "";
        var today = new Date();
        var CurrentMonth = (today.getMonth()+1);
        var CurrentDay = (today.getDay());
        if (CurrentDay<10){sToday = "0"+today.getDate().toString();}else{sToday = today.getDate().toString();}
        if(CurrentMonth<10){sToday += "0";}else{sToday += "";}
        sToday += (today.getMonth()+1).toString();
        sToday += today.getYear().toString();
        sToday += today.getHours().toString();
        sToday += today.getMinutes().toString();
        sToday += today.getSeconds().toString();
        //console.log("FR: " + sToday)
        return sToday;
    }

    this.getCurrentDateForGrid = function()
    {

        var myDate = new Date();
        var month=new Array();
        month[0]="Jan";
        month[1]="Feb";
        month[2]="Mar";
        month[3]="Apr";
        month[4]="May";
        month[5]="Jun";
        month[6]="Jul";
        month[7]="Aug";
        month[8]="Sep";
        month[9]="Oct";
        month[10]="Nov";
        month[11]="Dec";
        return (myDate.getDate()+" "+month[myDate.getMonth()]+" "+myDate.getFullYear());
    }
};

module.exports = new TimeUtilities();