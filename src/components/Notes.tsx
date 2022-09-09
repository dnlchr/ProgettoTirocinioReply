import styled from "styled-components";
import { useState, useEffect } from "react";

const LOCALSTORAGE_NOTE = "Lorem ipsum bla bla...";
type Props = {};

const Notes = (props: Props): JSX.Element => {
  const [nota, setNota] = useState<string>("");
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout>();

  useEffect(() => {
    let localStorageNote = localStorage.getItem(LOCALSTORAGE_NOTE) ?? "";

    setNota(localStorageNote);
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNota(event.target.value);

    if (timeoutRef) clearTimeout(timeoutRef);
    const newTimeout = setTimeout(() => {
      localStorage.setItem(LOCALSTORAGE_NOTE, event.target.value);
    }, 500);
    setTimeoutRef(newTimeout);
  };

  return (
    <TextArea
      value={nota}
      id="note"
      name="note"
      onChange={changeHandler}
      placeholder="Lorem ipsum bla bla..."
    ></TextArea>
  );
};

let TextArea = styled.textarea`
  font-family: "Big Caslon";
  color: black;
  font-size: 13px;
  letter-spacing: 3px;
  word-spacing: 9px;
  font-weight: lighter;
  border-style: none;
  border-radius: 8px;
  padding: 8px;
  resize: none;
`;

export default Notes;
