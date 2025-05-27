const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');
const zigbeeHerdsmanUtils = require('zigbee-herdsman-converters/lib/utils');

const exposes = zigbeeHerdsmanConverters['exposes'] || require("zigbee-herdsman-converters/lib/exposes");
const ea = exposes.access;
const e = exposes.presets;

const fz = zigbeeHerdsmanConverters.fromZigbeeConverters || zigbeeHerdsmanConverters.fromZigbee;

// Ajout du convertisseur ptvo_switch_uart
fz.THZReader = {
    cluster: "genMultistateValue",
    type: ["attributeReport", "readResponse"],
    convert: (model, msg, publish, options, meta) => {
        let data = msg.data.stateText;
        if (typeof data === "object") {
            let bHex = false;
            let code;
            let index;
            for (index = 0; index < data.length; index += 1) {
                code = data[index];
                if (code < 32 || code > 127) {
                    bHex = true;
                    break;
                }
            }
            if (!bHex) {
                data = data.toString("latin1");
            } else {
                // data = [...data];
                data = Buffer.from(data).toString('ascii');
            }
        }

        // Si `data` est une chaîne JSON, on la parse
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        } catch (e) {
            meta.logger.debug(`Failed to parse data: ${data}`);            
        }

        // Retourne les propriétés spécifiques
        return {
            tag: parsedData.tag,
            uid: parsedData.uid,
        };
    },
};


// Définition de l'appareil
const device = {
    zigbeeModel: ['THZReader'],
    model: 'THZReader',
    vendor: 'THEDandCo',
    description: 'RFID reader ISO 15693',
    fromZigbee: [fz.ignore_basic_report, fz.THZReader],
    toZigbee: [],
    exposes: [
        exposes.binary('tag', ea.STATE, true, false).withDescription('Tag present status (e.g., true, false)'),
        exposes.text('uid', ea.STATE).withDescription('UID of the read RFID tag'),
    ],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await endpoint.read('genBasic', ['modelId', 'swBuildId', 'powerSource']);
    },
};

module.exports = device;
