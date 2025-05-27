# 📘 User Manual — THZReader  
Zigbee ISO15693 RFID Reader  
by THED&Co

---

## 📦 Package Contents

- 1× THZReader RFID Reader
- 1× USB Type-C Power Cable
- 1× USB Type-A Power Adapter
- 1× RFID Card (range up to 12 cm)

---

## ⚙️ Technical Specifications

- **Protocol**: Zigbee
- **Supported RFID Standard**: ISO15693
- **Reading Range**: 0–12 cm
- **Power Supply**: 5V via USB Type-C
- **Enclosure**: PLA
- **Compatibility**: Zigbee2MQTT, Home Assistant (via Z2M)
- **Dimensions (L×W×H)**: 93.6 × 43.6 × 15.5 mm

---

## 🧱 Physical Installation

1. Choose a suitable location: install the THZReader in a clear, dry place, away from electromagnetic interference.
2. Mounting: use the through holes for stable mounting on a flat surface.
3. Power: connect the power supply. An LED will briefly light up to indicate power-on.
4. Startup: wait 5 seconds for the module to fully start.
5. Reading: reading a tag takes between 200 ms and 1200 ms.

---

## 🔗 Zigbee Pairing Procedure

1. Download the external converter from:  
   [github.com/TLongstride/THED-Co](https://github.com/TLongstride/THED-Co) → THZReader folder
2. Place the `THZReader.js` file in the `/external_converters/` folder of your Zigbee2MQTT configuration.
3. Restart Zigbee2MQTT.
4. Enable Zigbee inclusion on your coordinator.
5. Plug in the module: an LED will blink slowly, indicating it is ready to pair.
6. The module will appear as **THZReader** in the Zigbee2MQTT interface.

---

## 🏠 Integration with Home Assistant

For the Zigbee2MQTT addon in Home Assistant:

1. Go to the `config/zigbee2mqtt` directory.
2. Create a folder named `external_converters` if it does not already exist.
3. Copy the `THZReader.js` file into the `external_converters` folder.
4. (Optional) Copy the `THZReader.png` file into the `device_icons` folder if you want to use a custom icon for the device.
5. Restart Zigbee2MQTT.
6. In the Settings tab, enter `device_icons/THZReader.png` in the icon field to set the device’s custom icon.

Once integrated via Zigbee2MQTT, two entities are automatically created:

- `binary_sensor.thzreader_presence`: detects the presence or absence of an RFID tag.
- `sensor.thzreader_uid`: exposes the UID of the detected RFID tag.

Use these entities in your Home Assistant automations:

- Trigger arrival/departure scenarios.
- Unlock a door or disable an alarm.
- Send custom notifications.

---

## 🛠️ Home Assistant Blueprint

This blueprint simplifies the integration of THZReader into your Home Assistant automations. It allows you to trigger specific actions based on RFID tag detection.

#### Features:
- Detection of presence or absence of a tag.
- Execution of custom automations based on the tag’s UID.

#### Importing the Blueprint:
1. Click the button below to directly import the blueprint into your Home Assistant instance.
2. Configure the settings as needed.

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZReader/blob/main/blueprints/en/THZReader.yaml)

## ⚠️ Safety Tips and Best Practices

- Do not expose the module to water or high humidity.
- Do not disassemble the module while powered.
- Avoid any metal objects between the tag and the sensor.

---

## 📞 Support & Documentation

- 📧 contact.thedco@gmail.com
- 🔗 [github.com/TLongstride](https://github.com/TLongstride)

---

🇫🇷 **Version française disponible**  
Vous cherchez le manuel en français ? Rendez-vous sur le dépôt GitHub et ouvrez le fichier `Mode_d_emploi.md`.

---

Product imagined, designed, and manufactured with care by **THED&Co** — France 🇫🇷