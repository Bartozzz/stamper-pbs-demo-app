import styled from "styled-components/native";

import defaultStyles from "../../constants/Styles";

export const ImageBackground = styled.ImageBackground.attrs(props => ({
    resizeMode: "cover"
  }))`
    ${defaultStyles.grow};
    ${defaultStyles.row};
  
    width: 100%;
    height: 100%;
  
    border-radius: 10px;
`;