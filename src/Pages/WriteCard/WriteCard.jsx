import Card from "../../Layouts/Layout";

import React, { useCallback, useContext, useEffect } from "react";
import styles from "./WriteCard.module.scss";
import { AuthContext } from "../../Helper/Context";

export default function WriteCard() {
  const { user } = useContext(AuthContext);

  const onWrite = useCallback(async (message) => {
    console.log("mssg:", message);
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        // This line will avoid showing the native NFC UI reader
        await ndef.scan();
        await ndef.write({ records: [{ recordType: "url", data: message }] });
        alert(`Profile saved to your NFC card!`);
      } catch (error) {
        console.log(error);
        alert(`Something went wrong!`);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.uid) onWrite(`https://fir-9-be.web.app/profile/${user.uid}`);
  }, [user, onWrite]);

  return (
    <Card>
      <div className={styles.container}>
        <h1>
          Tap your Card on
          <br />
          back of your device to write.
        </h1>

        <div className={styles.tapDeviceIcon}>
          <span>Tap Device</span>
        </div>

        <p>
          Make sure to keep your device
          <br /> supports NFC or else use
          <a href="#">QR code</a>
        </p>
      </div>
    </Card>
  );
}
