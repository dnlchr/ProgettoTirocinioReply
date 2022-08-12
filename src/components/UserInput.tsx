import clsx from "clsx";
import { useState, useEffect } from "react";
import styled from "styled-components";

const LOCAL_STORAGE_USERNAME = "username";
type Props = {};

const UserInput = (props: Props): JSX.Element => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const items = localStorage.getItem(LOCAL_STORAGE_USERNAME) ?? "";

    setName(items);
    //  console.log("sto gettando item", items);
  }, []);

  //useEffect(() => {
  //localStorage.setItem("username", name);
  // console.log("sto settando item", name);
  //}, [name]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    localStorage.setItem(LOCAL_STORAGE_USERNAME, name);
  };

  return (
    <InputField
      className={clsx(!name && "isEmpty")}
      type="text"
      value={name}
      onChange={changeHandler}
      placeholder="insert your name"
    />
  );
};

let InputField = styled.input`
  border: none;
  font-family: "Big Caslon";
  color: black;
  font-size: 40px;
  outline: none;

  &:focus {
    color: white;
    background: black;
    font-size: 40px;
  }
  &.isEmpty {
    color: grey;
    font-size: 19px;
  }
`;

export default UserInput;
