import { useState } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner = ({ handleScan }: { handleScan: (code: string) => void }) => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      let qrlBaseResult = "?TreeCode=";

      if (result.getText().includes(qrlBaseResult)) {
        const url = result.getText()
        const code = result.getText().split(qrlBaseResult, 2)[1]
        setResult(code)
        handleScan(code);



      }


    },
  });

  return (
    <>
      <video width="300" height="200" ref={ref} className="rounded-md " />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};

export default BarcodeScanner