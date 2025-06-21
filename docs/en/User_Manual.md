# 📘 User Manual — THZReader
Zigbee ISO15693 RFID Reader  
by THED&Co

---

## 📦 Package Contents

- 1× THZReader RFID Reader
- Option: 1× USB Type-C Power Cable
- Option: 1× USB Type-A Power Adapter
- Option: 1× RFID Card (range up to 12 cm)

---

## ⚙️ Technical Specifications

- **Protocol:** Zigbee
- **Supported RFID Standard:** ISO15693
- **Reading Range:** 0–12 cm
- **Power Supply:** 5V via USB Type-C
- **Consumption:** typical 50 mA (USB 5 V supply)  
- **Enclosure:** PLA
- **Compatibility:** Zigbee2MQTT, ZHA, Home Assistant
- **Dimensions (L×W×H):** 93.6 × 43.6 × 15.5 mm
- **Hardware:**  
   - RFID: NXP PN5180A chip  
   - Zigbee: Ebyte CC2530 chip  
   - Main microcontroller: Espressif ESP32-C3

---

## 🧱 Physical Installation

1. Choose a suitable location: install the THZReader in a clear, dry place, away from electromagnetic interference.
2. The antenna is located on the side marked with the Wi-Fi symbol. It is best to orient it towards the reading area.
3. Mounting: use the through-holes for stable mounting on a flat surface.
4. Power: connect the power supply. An LED will briefly light up to indicate power-on.
5. Startup: wait 5 seconds for the module to fully start.
6. Reading: reading a badge takes between 200 ms and 1200 ms.

---

## 🔗 Zigbee Pairing Procedure

1. Enable Zigbee inclusion on your coordinator.
2. Plug in the module: an LED will blink slowly, indicating it is ready to pair.
3. The module will appear as **THZReader** in the Zigbee2MQTT interface.

If necessary, you can reset the module by pressing the internal reset button located on the back of the enclosure for 10 seconds. This will erase all settings, and the module will be ready to pair again.

---

## 🏠 Integration with Home Assistant via Zigbee2MQTT

For the Zigbee2MQTT addon in Home Assistant:

1. Go to the `config/zigbee2mqtt` directory.
2. Create a folder named `external_converters` if it does not already exist.
3. Copy the `THZReader.js` file into the `external_converters` folder.
4. (Optional) Copy the `THZReader.png` file into the `device_icons` folder if you want to use a custom icon for the device.
5. Restart Zigbee2MQTT.
6. In the Settings tab, enter `device_icons/THZReader.png` in the icon field to set the custom device icon.

Once integrated via Zigbee2MQTT, two entities are automatically created:

- `binary_sensor.thzreader_presence`: detects the presence or absence of an RFID badge/tag.
- `sensor.thzreader_uid`: exposes the UID of the detected RFID badge.

Use these entities in your Home Assistant automations:

- Trigger arrival/departure scenarios.
- Unlock a door or disable an alarm.
- Send custom notifications.

---

## 🏠 Integration with Zigbee Home Automation (ZHA)

> ⚠️ **ZHA Limitation**  
> ZHA does not allow direct exposure of the RFID badge UID as readable text in Home Assistant.

To integrate the THZReader with ZHA in Home Assistant:
1. Navigate to the `config` directory of your Home Assistant instance.
2. Create a folder named `custom_zha_quirks` if it does not already exist.
3. Copy the `thzreader.py` file into the `custom_zha_quirks` folder.
4. Make sure you have an empty `__init__.py` file in the `custom_zha_quirks` folder so ZHA recognizes the quirks.
5. Then, add the following lines to your `configuration.yaml` file:
   ```yaml
   zha:
      enable_quirks: true
      custom_quirks_path: /config/custom_zha_quirks
   ```
6. Restart Home Assistant.

You should now see the THZReader appear in your ZHA devices, and 1 entity will be created:
- `binary_sensor.thedandco_thzreader_occupation`: detects the presence or absence of an RFID badge/tag.

From now on, scanned tags will trigger a ZHA_event with the badge UID. You can use this event in your automations to trigger specific actions.

You can also use the "THZReader_ZHALink" blueprint to perfectly integrate badge reading with Home Assistant's Tag platform. This blueprint translates a ZHA_event into a tag_scanned event for the Tag platform.

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZReader/blob/main/blueprints/en/THZReader_ZHALink.yaml)

## 🛠️ Home Assistant Blueprint

This blueprint simplifies the integration of the THZReader into your Home Assistant automations. It allows you to trigger specific actions based on the detection of an RFID badge.

#### Features:
- Detection of presence or absence of a badge.
- Execution of custom automations based on the badge UID.

#### Importing the Blueprint:
1. Click the button below to directly import the blueprint into your Home Assistant instance.
2. Configure the parameters as needed.

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZReader/blob/main/blueprints/en/THZReader.yaml)

## ⚠️ Safety Tips and Best Practices

- Do not expose the module to water or high humidity.
- Do not disassemble the module while it is powered.
- Avoid any metal objects between the badge and the sensor.
- Do not expose the module to extreme temperatures (below -10°C or above 40°C).
- The module is designed for indoor use. For outdoor use, place it in a waterproof and weather-resistant enclosure.

---

## 🔒 User Responsibility

The THZReader is an RFID badge reader with no inherent action. It is limited to detecting the presence of a compatible RFID tag (ISO15693 standard) and transmitting the information to the connected home automation or IT system.  
**Compliance with the ISO15693 standard does not guarantee system infallibility or absolute access security.**

Any action triggered following the reading of a tag (e.g., door opening, device activation, software state change) depends entirely on the configuration set up by the user or their integrator.

Consequently, the user is solely responsible for:
- scenarios or automations linked to tag reading,
- securing access or controlled devices,
- managing access rights associated with each tag.

**THED&Co** cannot be held responsible for the consequences of misconfiguration or inappropriate use of the THZReader in critical or security systems.

---

## 📞 Support & Documentation

- 📧 contact@thedandco.ovh
- 🔗 [github.com/TLongstride](https://github.com/TLongstride)

---

🇫🇷 **French version available**  
Looking for the manual in French? Visit the GitHub repository and open the `mode_d_emploi.md` file.

---

Product imagined, designed, and manufactured with care by **THED&Co** — France 🇫🇷
This documentation is translated from the original French version. In case of discrepancies, the French version prevails.

Copyright © 2025 THED&Co. All rights reserved.