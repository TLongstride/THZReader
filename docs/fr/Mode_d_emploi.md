# 📘 Manuel d’utilisation — THZReader
Lecteur RFID Zigbee ISO15693  
by THED&Co

---

## 📦 Contenu du colis

- 1× Lecteur RFID THZReader
- Option : 1× Câble d’alimentation USB Type-C
- Option : 1× Adaptateur secteur USB Type-A
- Option : 1× Carte RFID (portée jusqu’à 12 cm)

---

## ⚙️ Spécifications techniques

- **Protocole** : Zigbee
- **Norme RFID supportée** : ISO15693
- **Portée de lecture** : 0-12 cm
- **Alimentation** : 5V via USB Type-C
- **Consommation** : typique 50 mA (alimentation USB 5 V)  
- **Boîtier** : PLA
- **Compatibilité** : Zigbee2MQTT, ZHA, Home Assistant
- **Dimensions lxLxh** : 93.6 × 43.6 × 15.5 mm
- **Matériel** :  
   - RFID : puce NXP PN5180A  
   - Zigbee : puce Ebyte CC2530  
   - Microcontrôleur principal : Espressif ESP32-C3

---

## 🧱 Installation physique

1. Choisissez un emplacement adapté : installez le THZReader dans un lieu dégagé, sec et à l’abri des interférences électromagnétiques.
2. L'antenne se trouve du coté signalé par le symbole WI-FI. Il est préférable de l'orienter vers la zone de lecture.
3. Fixation : utilisez les trous traversants pour une fixation stable sur une surface plane.
4. Branchement : connectez l’alimentation. Une LED s’allume brièvement pour indiquer la mise sous tension.
5. Démarrage : attendez 5 secondes pour le démarrage complet du module.
6. Lectures : la lecture d'un badge prend entre 200 ms et 1200 ms.

---

## 🔗 Procédure d’appairage Zigbee

1. Activez l’inclusion Zigbee dans votre coordinateur.
2. Branchez le module : une LED clignote lentement indiquant qu’il est prêt à s’appairer.
3. Le module apparaît sous le nom **THZReader** dans l’interface Zigbee2MQTT.

En cas de nécessité, vous pouvez réinitialiser le module en appuyant sur le bouton de réinitialisation intérieur situé à l’arrière du boîtier pendant 10 secondes. Cela effacera tous les paramètres et le module sera prêt à être appairé à nouveau.

---

## 🏠 Intégration dans Home Assistant via Zigbee2MQTT
Pour l’addon Zigbee2MQTT de Home Assistant :

1. Accédez au répertoire `config/zigbee2mqtt`.
2. Créez un dossier nommé `external_converters` s’il n’existe pas déjà.
3. Copiez le fichier `THZReader.js` dans le dossier `external_converters`.
4. (Optionnel) Copiez le fichier `THZReader.png` dans le dossier `device_icons` si vous souhaitez utiliser une icône personnalisée pour l’appareil.
5. Redémarrez Zigbee2MQTT.
6. Dans l’onglet Paramètres, saisissez `device_icons/THZReader.png` dans le champ icône pour définir l’icône personnalisée de l’appareil.

Une fois intégré via Zigbee2MQTT, deux entités sont automatiquement créées :

- `binary_sensor.thzreader_presence` : détecte la présence ou l’absence d’un badge/tag RFID.
- `sensor.thzreader_uid` : expose l’UID du badge RFID détecté.

Utilisez ces entités dans vos automatisations Home Assistant :

- Déclencher des scénarios d’arrivée/départ.
- Déverrouiller une porte ou désactiver une alarme.
- Envoyer des notifications personnalisées.

---

## 🏠 Integration avec Zigbee Home Automation (ZHA)

> ⚠️ **Limitation ZHA**  
> ZHA ne permet pas d’exposer directement l’UID du badge RFID sous forme de texte lisible dans Home Assistant. 

Pour intégrer le THZReader avec ZHA dans Home Assistant :
1. Naviguez vers le répertoire `config' de votre instance Home Assistant.
2. Créez un dossier nommé `custom_zha_quirks` s’il n’existe pas déjà.
3. Copiez le fichier `thzreader.py` dans le dossier `custom_zha_quirks`.
4. Attention, vous devez avoir un fichier `__init__.py` vide dans le dossier `custom_zha_quirks` pour que ZHA reconnaisse les quirk.
5. Ensuite, ajouter à votre fichier `configuration.yaml` la ligne suivante :
   ```yaml
   zha:
      enable_quirks: true
      custom_quirks_path: /config/custom_zha_quirks
   ```
6. Redémarrez Home Assistant.

Vous devriez maintenant voir le THZReader apparaître dans vos appareils ZHA et 1 entité sera créée :
- `binary_sensor.thedandco_thzreader_occupation` : détecte la présence ou l’absence d’un badge/tag RFID.

A partir de maintenant, les tags scannés déclancheront un ZHA_event avec l’UID du badge. Vous pouvez utiliser cet événement dans vos automatisations pour déclencher des actions spécifiques.

Vous pouvez également utiliser le blueprint "THZReader_ZHALink" afin d'intégrer parfaitement la lecture des badges avec la plateforme Tag de Home Assistant. Ce dernier permet de transcrire un ZHA_event en tag_scanned de la plateforme Tag de Home Assistant.

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZReader/blob/main/blueprints/fr/THZReader_ZHALink.yaml)

## 🛠️ Blueprint Home Assistant

Ce blueprint simplifie l’intégration du THZReader dans vos automatisations Home Assistant. Il permet de déclencher des actions spécifiques en fonction de la détection d’un badge RFID.

#### Fonctionnalités :
- Détection de présence ou d’absence d’un badge.
- Exécution d’automatisations personnalisées basées sur l’UID du badge.

#### Importation du Blueprint :
1. Cliquez sur le bouton ci-dessous pour importer directement le blueprint dans votre instance Home Assistant.
2. Configurez les paramètres selon vos besoins.

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZReader/blob/main/blueprints/fr/THZReader.yaml)

## ⚠️ Conseils de sécurité et bonnes pratiques

- Ne pas exposer le module à l’eau ou à une forte humidité.
- Ne pas démonter le module lorsqu’il est alimenté.
- Évitez toute présence d’éléments métalliques entre le badge et le capteur.
- Ne pas exposer le module à des températures extrêmes (inférieures à -10°C ou supérieures à 40°C).
- Le module est conçu pour une utilisation en intérieur. Pour une utilisation en extérieur, placez-le dans un boîtier étanche et résistant aux intempéries.

---

## 🔒 Responsabilité de l’utilisateur

Le THZReader est un lecteur de badges RFID sans action propre. Il se limite à détecter la présence d’un tag RFID compatible (conforme à la norme ISO15693) et à transmettre les informations au système domotique ou informatique auquel il est connecté.  
**La conformité à la norme ISO15693 ne garantit pas l’infaillibilité du système ou la sécurité absolue des accès.**

Toute action déclenchée suite à la lecture d’un tag (ex. : ouverture de porte, activation d’un appareil, modification d’un état logiciel) dépend entièrement de la configuration mise en place par l’utilisateur ou son intégrateur.

En conséquence, l’utilisateur est seul responsable :
- des scénarios ou automatismes liés à la lecture des tags,
- de la sécurisation des accès ou des dispositifs commandés,
- de la gestion des droits d’accès associés à chaque tag.

**THED&Co** ne saurait être tenue responsable des conséquences d’une mauvaise configuration ou d’un usage inapproprié du THZReader dans des systèmes critiques ou de sécurité.

---

## 📞 Support & documentation

- 📧 contact@thedandco.ovh
- 🔗 [github.com/TLongstride](https://github.com/TLongstride)

---

🇬🇧 **English version available**  
Looking for the manual in English? Visit the GitHub repository and switch to the `User_Manual.md` file.

---

Produit imaginé, conçu et fabriqué avec soin par **THED&Co** — France 🇫🇷
Copyright © 2025 THED&Co. Tous droits réservés.