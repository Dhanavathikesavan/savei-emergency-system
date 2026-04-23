function sendSOS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            document.getElementById("location").innerHTML =
                `📍 Location: ${lat}, ${lon}`;

            fetch("/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "Emergency User",
                    location: lat + "," + lon,
                    message: "🚨 SOS Emergency!"
                })
            })
            .then(res => res.json())
            .then(() => {
                alert("🚨 SOS Sent Successfully!");

                // Open Google Maps
                window.open(`https://www.google.com/maps?q=${lat},${lon}`);

                loadAlerts();
            });

        }, () => {
            alert("Location access denied ❌");
        });
    } else {
        alert("Geolocation not supported");
    }
}

function loadAlerts() {
    fetch("/alerts")
    .then(res => res.json())
    .then(data => {
        let output = "";
        data.forEach(a => {
            output += `
                <div class="card">
                    <b>${a.name}</b><br>
                    📍 ${a.location}<br>
                    ${a.message}<br>
                    ⏰ ${a.time}
                </div>
            `;
        });
        document.getElementById("alerts").innerHTML = output;
    });
}

loadAlerts();