# THZReader

This repository gathers all the resources for the **THZReader** (Zigbee ISO 15693 RFID reader).

## User Manual

The user manual for THZReader is available in the following languages:

- **French**: [Mode d'emploi (French User Manual)](docs/fr/Mode_d_emploi.md)
- **English**: [User Manual (English)](docs/en/User_Manual.md)

## Repository Contents

- **User Manual**: User documentation for installation, configuration, and usage of THZReader.
- **External Converter for Zigbee2MQTT**: External converter file for integrating THZReader with Zigbee2MQTT ([Zigbee2MQTT/THZReader.js](Zigbee2MQTT/THZReader.js)).
- **Technical Resources**: Schematics, technical notes, configuration examples, etc.

## Tested RFID Tags and Reading Distances

| Tag                   | Size / Type                  | Max Reading Distance |
|------------------------|-------------------------------|----------------------|
| PVC Card              | Rigid card (credit card size) | Up to **12 cm**     |
| Flexible Tag Ø22mm    | Soft adhesive tag (22 mm)     | Up to **7 cm**      |
| Key Fob (Blue)        | Plastic keychain tag          | Up to **7 cm**      |
| RFID Inlay 50×50 mm   | Square adhesive inlay         | Up to **10 cm**     |

All ISO 15693 tags are compatible.

## Using the Zigbee2MQTT Converter

To integrate THZReader with Zigbee2MQTT:

1. Copy the [`Zigbee2MQTT/THZReader.js`](Zigbee2MQTT/THZReader.js) file into the `external_converters` folder of your Zigbee2MQTT installation.
2. Restart Zigbee2MQTT.

For Zigbee2MQTT Home Assistant Addon:

1. Navigate to the `config/zigbee2mqtt` directory.
2. Create a folder named `external_converters` if it does not already exist.
3. Copy the `THZReader.js` file into the `external_converters` folder.
4. Copy the `THZReader.png` file into the `device_icons` folder if you want to use custom device icons.
5. Restart Zigbee2MQTT.
6. In the **Settings** tab, enter `device_icons/THZReader.png` in the **icon** field to set the custom device icon.

## 🛠️ Home Assistant Blueprint

Simplify the integration of THZReader into your Home Assistant automations with this blueprint. It enables triggering specific actions based on RFID badge detection.

The blueprint is available in **French** :

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZReader/blob/main/blueprints/fr/THZReader.yaml)

The blueprint is available in **English** :

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZReader/blob/main/blueprints/en/THZReader.yaml)

## Where to Buy

You can purchase THZReader on [Tindie](https://www.tindie.com/products/38459/).

<a href="https://www.tindie.com/stores/thedandco/?ref=offsite_badges&utm_source=sellers_THEDco&utm_medium=badges&utm_campaign=badge_small"><img src="https://d2ss6ovg47m0r5.cloudfront.net/badges/tindie-smalls.png" alt="I sell on Tindie" width="200" height="55"></a>

## Images

Find product and usage images in the [docs/images](docs/images) folder.

## Video

Watch the THZReader reader in action on [YouTube](https://www.youtube.com/@THEDandCo).

## About

- **Manufacturer**: THED&Co
- **Description**: Zigbee-connected ISO 15693 RFID reader

## Useful Links

- [Zigbee2MQTT Documentation](https://www.zigbee2mqtt.io/)
- [ISO 15693 RFID Standard](https://en.wikipedia.org/wiki/ISO/IEC_15693)

---

For any questions or suggestions, feel free to open an issue or contact us at [contact.thedco@gmail.com](mailto:contact.thedco@gmail.com).

