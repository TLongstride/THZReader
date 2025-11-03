// Zigbee2MQTT device definition for THZReader
// This file is used to define the device's capabilities, exposes, and converters.

// Version: 1.1 - 03/11/2025 - Fix breaking change on Z2M v2.6.3

// License: Creative Commons BY-NC 4.0
// Author: THED&Co


import {access, presets} from "zigbee-herdsman-converters/lib/exposes";
import {bind} from "zigbee-herdsman-converters/lib/reporting";

const fzLocal = {
    THZReader: {
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
                    data = Buffer.from(data).toString("ascii");
                }
            }

            // Si `data` est une chaîne JSON, on la parse
            let parsedData;
            try {
                parsedData = JSON.parse(data);
            } catch {
                meta.logger.debug(`Failed to parse data: ${data}`);
            }

            // Retourne les propriétés spécifiques
            return {
                tag: parsedData.tag,
                uid: parsedData.uid,
            };
        },
    },
};

export default {
    zigbeeModel: ["THZReader"],
    model: "THZReader",
    vendor: "THEDandCo",
    description: "RFID reader ISO 15693",
    fromZigbee: [fzLocal.THZReader],
    toZigbee: [],
    exposes: [
        presets.binary("tag", access.STATE, true, false).withDescription("Tag present status (e.g., true, false)"),
        presets.text("uid", access.STATE).withDescription("UID of the read RFID tag"),
    ],
    configure: async (device, coordinatorEndpoint, definition) => {
        const endpoint = device.getEndpoint(1);

        if (endpoint) {
            await bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await endpoint.read("genBasic", ["modelId", "swBuildId", "powerSource"]);
        }
    },
};
