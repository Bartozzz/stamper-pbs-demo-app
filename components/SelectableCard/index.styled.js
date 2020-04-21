import styled from "styled-components/native";

export const CardContainer = styled.TouchableOpacity`
  position: relative;

  padding: 10px;
  margin-horizontal: 15px;
  margin-vertical: 10px;

  border-width: 1px;
  border-radius: 10px;
  border-style: solid;
  border-color: ${({ selected }) => (selected ? "#0046F5" : "#203451")};
  background-color: ${({ selected }) => (selected ? "#ffffff" : "#203451")};
`;
