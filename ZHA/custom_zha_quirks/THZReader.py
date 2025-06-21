# Quirk for THZReader device with custom cluster for NFC UID reading
# This quirk defines a custom cluster to parse JSON data from the device
# and expose occupancy sensing for multiple NFC tags.

# Version: 1.0 - 17/06/2025 - Initial release

# License: Creative Commons BY-NC 4.0
# Author: THED&Co

import logging
import json
import re

from zigpy.profiles import zha
import zigpy.types as t
from zigpy.zcl.clusters.general import Basic
from zigpy.zcl.clusters.general import MultistateValue
from zigpy.zcl.clusters.measurement import OccupancySensing
from zigpy.quirks import CustomDevice
from zhaquirks import LocalDataCluster
from zhaquirks.const import (
    DEVICE_TYPE, ENDPOINTS,
    INPUT_CLUSTERS, OUTPUT_CLUSTERS,
    MODELS_INFO, PROFILE_ID, SKIP_CONFIGURATION, ZHA_SEND_EVENT,
)

_LOGGER = logging.getLogger(__name__)
_LOGGER.setLevel(logging.DEBUG)


class THZReaderCluster(LocalDataCluster):
    cluster_id = MultistateValue.cluster_id
    attributes = {
        0x000E: ("state_text", t.CharacterString),
        0x0005: ("present_value", t.uint16_t),
        0x0000: ("presence", t.Bool),
        0x0001: ("nfc_uid", t.CharacterString),
    }

    _previous_uid = None  # Stocke la dernière valeur de tag lue

    def _update_attribute(self, attrid, value):
        super()._update_attribute(attrid, value)

        if attrid != 0x000E:
            return
        
        raw = value
        if isinstance(raw, (bytes, bytearray)):
            raw = raw.decode("utf-8", "ignore").strip()
        else:
            raw = str(raw).strip()

        m = re.search(r"\{.*\}", raw)
        if not m:
            _LOGGER.debug("THZReaderCluster: no JSON found in %r", raw)
            return
        
        try:
            data = json.loads(m.group(0))
        except json.JSONDecodeError as e:
            _LOGGER.debug("THZReaderCluster: JSON parse error %s in %r", e, m.group(0))
            return
        
        presence = bool(data.get("tag", False))
        uid = data.get("uid", "")

        super()._update_attribute(0x0000, presence)
        super()._update_attribute(0x0001, uid)
        
        # Ajout de previous_uid dans l'event
        previous_uid = self._previous_uid
        self._previous_uid = uid
        self.listener_event(ZHA_SEND_EVENT, "tag_scanned", {"uid": uid, "previous_uid": previous_uid})

        if hasattr(self.endpoint, "occupancy"):
            self.endpoint.occupancy.update_attribute(0x0000, 1 if presence else 0)

class PresenceTagCluster(LocalDataCluster, OccupancySensing):
    cluster_id = OccupancySensing.cluster_id  # 0x0406
    ep_attribute = "occupancy"
    attributes = {
        0x0000: ("occupancy", t.bitmap8),  # 0x01 = occupé, 0x00 = libre
    }

class THZReaderDevice(CustomDevice):
    """Custom quirk for THZReader device supporting multiple NFC tag occupancy clusters."""
    
    signature = {
        MODELS_INFO: [("THEDandCo", "THZReader")],
        ENDPOINTS: {
            1: {
                PROFILE_ID: zha.PROFILE_ID,
                DEVICE_TYPE: 0xFFFE,
                INPUT_CLUSTERS: [Basic.cluster_id, MultistateValue.cluster_id],
                OUTPUT_CLUSTERS: [Basic.cluster_id],
            },
            2: {
                PROFILE_ID: zha.PROFILE_ID,
                DEVICE_TYPE: 0xFFFE,
                INPUT_CLUSTERS: [MultistateValue.cluster_id],
                OUTPUT_CLUSTERS: [],
            },
        },
    }

    replacement = {
        SKIP_CONFIGURATION: True,
        ENDPOINTS: {
            1: {
                PROFILE_ID: zha.PROFILE_ID,
                DEVICE_TYPE: 0xFFFE,
                INPUT_CLUSTERS: [Basic.cluster_id],
                OUTPUT_CLUSTERS: [Basic.cluster_id],
            },
            2: {
                PROFILE_ID: zha.PROFILE_ID,
                DEVICE_TYPE: 0xFFFE,
                INPUT_CLUSTERS: [THZReaderCluster, PresenceTagCluster],
                OUTPUT_CLUSTERS: [],
            },
        },
    }
