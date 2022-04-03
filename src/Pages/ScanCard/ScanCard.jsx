import Card from "../../Layouts/Layout";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./ScanCard.module.scss";

export default function ScanCard() {
  const [serialNumber, setSerialNumber] = useState("");
  const [message, setMessage] = useState("");

  const scan = useCallback(async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();

        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event) => {
          console.log("NDEF message read.");
          onReading(event);
          alert("event:", event.message);
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  }, []);

  const onReading = ({ message, serialNumber }) => {
    setSerialNumber(serialNumber);
    alert("serial no:", serialNumber);
    alert("mssg:", message);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          //todo:txt mssg
          break;
        case "url":
          const textDecoder = new TextDecoder(record.encoding);
          alert("url:", textDecoder.decode(record.data));
          setMessage(textDecoder.decode(record.data));
          break;
        default:
          alert("event type:", record.recordType);
        // TODO: Handle other records with record data.
      }
    }
  };

  useEffect(() => {
    scan();
  }, [scan]);

  return (
    <Card>
      <div className={styles.container}>
        <h1>
          Scan for
          <br /> Business Card
        </h1>

        <div className={styles.tapDeviceIcon}>
          <span>Tap Device</span>
        </div>
        <a className={styles.card_link} target="_blank">
          Card Link : {message}
        </a>
        <p>
          Make sure to keep your device
          <br /> supports NFC or else use
          <a href="#">QR code</a>
        </p>
      </div>
    </Card>
  );
}
