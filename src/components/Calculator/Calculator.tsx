import { useState, useEffect } from "react";
import Header from "../Header/Header";

import Display from "../Display/Display";
import Buttons from "../Buttons/Buttons";
import { buttons } from "./CalculatorButtonValues";

import { parseStringAsMath } from "../../utils/Math";

export type KeyboardEvent = {
  key: string;
};

const Calculator = () => {
  const [operations, setOperations] = useState("");

  const onClickButtonHandler = (title: string) => {
    let result: string | number;

    if (operations === "error" && !["del", "reset"].includes(title)) {
      setOperations(title);
      return;
    }

    if (title === "reset") {
      setOperations("");
      return;
    }

    if (title === "del" && operations === "error") {
      setOperations("");
      return;
    }

    if (title === "del") {
      setOperations((val) => val.slice(0, -1));
      return;
    }

    if (title === "=" && operations.trim() === "") {
      setOperations("");
      return;
    }

    if (title === "=") {
      try {
        let updatedOperations = operations.replace(/x/gi, "*");
        updatedOperations = updatedOperations.replace(/=/gi, "");
        result = parseStringAsMath(updatedOperations);

        if (!isFinite(result)) {
          throw new Error("The string is not a valid math expression");
        }

        if (typeof result === "number" && !isNaN(result)) {
          result = result.toFixed(2);
        }

        result = (+result).toString();
        setOperations(result);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }
        setOperations("error");
      }
      return;
    }

    setOperations((val) => `${val}${title}`);
  };

  useEffect(() => {
    const keyDownEventHandler = (event: KeyboardEvent) => {
      let key = event.key;

      const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "Backspace",
        "Enter",
        "+",
        "-",
        "*",
        "/",
        "=",
      ];

      if (allowedKeys.includes(key)) {
        if (key === "Backspace") {
          key = "del";
        }

        if (key === "Enter") {
          key = "=";
        }

        if (key === "*") {
          key = "x";
        }

        onClickButtonHandler(key);
      }
    };

    document.addEventListener("keydown", keyDownEventHandler);

    return () => document.removeEventListener("keydown", keyDownEventHandler);
  }, [operations]);

  return (
    <div className="max-w-[20.375rem] mx-auto xs:max-w-[33.75rem]">
      <Header />
      <Display text={operations} />
      <Buttons onClickButton={onClickButtonHandler} values={buttons} />
    </div>
  );
};

export default Calculator;
