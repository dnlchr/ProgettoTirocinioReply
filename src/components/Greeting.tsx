import React from "react";
import styled from "styled-components";

export interface TimeIntervals {
  greeting: string;
  minTime: number;
  maxTime: number;
}

const TIME_INTERVALS: TimeIntervals[] = [
  {
    greeting: "Good morning, ",
    minTime: 6,
    maxTime: 11,
  },

  {
    greeting: "Good afternoon, ",
    minTime: 11,
    maxTime: 18,
  },

  {
    greeting: "Good evening, ",
    minTime: 18,
    maxTime: 22,
  },

  {
    greeting: "Good night, ",
    minTime: 22,
    maxTime: 5,
  },
];

const getGreetingFromTime = (date: Date): string => {
  const hour = date.getHours();
  return (
    TIME_INTERVALS.find((_) => hour > _.minTime && hour <= _.maxTime)
      ?.greeting ?? "Good day"
  );
};

const Greeting = (): JSX.Element => {
  return <UserGreeting> {getGreetingFromTime(new Date())} </UserGreeting>;
};

let UserGreeting = styled.text`
  font-family: "Big Caslon";
  color: black;
  font-size: 40px;
`;

export default Greeting;
