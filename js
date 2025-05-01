// this file will be resonpible for update dashboard if wind and rain data is getting unsafe

let wind = msg.payload.wind || 30; // Replace with actual sensor input
let rain = msg.payload.rain || 5;

if (wind > 70 || rain > 50) {
    msg.level = "serious";
    msg.warning = "⚠️ Cyclone approaching. Seek shelter immediately.";
    msg.instruction1 = "Stay indoors or evacuate as advised.";
    msg.instruction2 = "Prepare emergency supplies.";
    msg.instruction3 = "Monitor updates via app, officials, or radio.";
} else if (wind > 40 || rain > 20) {
    msg.level = "moderate";
    msg.warning = "⚠️ Bad weather expected. Stay alert.";
    msg.instruction1 = "Avoid outdoor activity.";
    msg.instruction2 = "Check emergency supplies.";
    msg.instruction3 = "Follow updates from local officials.";
} else {
    msg.level = "safe";
    msg.warning = "✅ No immediate threats. Weather is calm.";
    msg.instruction1 = "Remain alert but continue normal activity.";
    msg.instruction2 = "Stay informed.";
    msg.instruction3 = "Prepare in advance for potential weather changes.";
}
return msg;
