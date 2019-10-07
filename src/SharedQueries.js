import { gql } from 'apollo-boost';

export const MY_PROFILE = gql`
  {
    myProfile {
      userName
    }
  }
`;